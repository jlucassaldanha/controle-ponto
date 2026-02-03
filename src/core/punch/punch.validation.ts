import { z } from "zod";
import { PunchType } from "@prisma/client";
import { convertLocalToUTC } from "@/lib/dateUtils";

export const timeStringSchema = z
  .string()
  .regex(/^\d{2}:\d{2}$/, { message: "Horario deve estar no formato HH:MM." })
  .transform((time) => {
    const [hours, minutes] = time.split(":").map(Number);

    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      return -1;
    }
    return hours * 60 + minutes;
  })
  .refine((minutes) => minutes >= 0, { message: "Horário inválido." });

export const dateStringSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Data deve estar no formato aaaa-mm-dd.",
  })
  .transform((date) => {
    const [year, month, day] = date.split("-").map(Number);
    // Apenas cria uma data como se fosse no timezone local do usuário
    // NÃO converte aqui, pois será convertida no addPunchesSchema
    return new Date(year, month - 1, day);
  });

export const punchSchema = z.object({
  time: timeStringSchema,
  type: z.enum(
    [
      PunchType.CLOCK_IN,
      PunchType.START_LUNCH,
      PunchType.END_LUNCH,
      PunchType.CLOCK_OUT,
    ],
    { message: "Valores invalidos." },
  ),
});

export const addPunchesSchema = z
  .object({
    date: dateStringSchema,
    punches: z.array(punchSchema),
  })
  .transform((addPunchesSchema) => {
    // A data vem do dateStringSchema já em timezone local (00:00 local)
    // Adiciona as horas (ainda em timezone local)
    const newPunches = addPunchesSchema.punches.map((punch) => {
      const localTimestamp = new Date(
        addPunchesSchema.date.getTime() + punch.time * 60000,
      );
      // Converte de local para UTC uma única vez
      const utcTimestamp = convertLocalToUTC(localTimestamp);
      return {
        type: punch.type,
        timestamp: utcTimestamp,
      };
    });

    return {
      date: addPunchesSchema.date,
      punches: newPunches,
    };
  })
  .refine(
    (addPunchesSchema) => {
      const types = addPunchesSchema.punches.map((punche) => punche.type);
      const uniqueTypes = new Set(types);

      return uniqueTypes.size === types.length;
    },
    {
      message: "Não deve haver pontos repetidos para o mesmo dia.",
      path: ["punches"],
    },
  )
  .refine(
    (data) => {
      const types = data.punches.map((p) => p.type);
      const hasStartLunch = types.includes(PunchType.START_LUNCH);
      const hasEndLunch = types.includes(PunchType.END_LUNCH);

      return hasStartLunch === hasEndLunch;
    },
    {
      message: "Início e Fim do Almoço devem ser registrados em conjunto.",
      path: ["punches"],
    },
  )
  .refine(
    (data) => {
      if (data.punches.length === 0) return true;

      const sortedPunches = [...data.punches].sort(
        (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
      );

      const types = sortedPunches.map((p) => p.type);

      const indexOfClockIn = types.indexOf(PunchType.CLOCK_IN);
      const indexOfClockOut = types.indexOf(PunchType.CLOCK_OUT);
      const indexOfStartLunch = types.indexOf(PunchType.START_LUNCH);
      const indexOfEndLunch = types.indexOf(PunchType.END_LUNCH);

      if (indexOfClockOut !== -1 && indexOfClockOut < indexOfClockIn) {
        return false;
      }

      if (indexOfEndLunch !== -1 && indexOfEndLunch < indexOfStartLunch) {
        return false;
      }

      if (indexOfStartLunch !== -1) {
        if (indexOfClockIn === -1 || indexOfStartLunch < indexOfClockIn) {
          return false;
        }

        if (indexOfClockOut === -1 || indexOfEndLunch > indexOfClockOut) {
          return false;
        }
      }

      return true;
    },
    {
      message: "A ordem ou combinação dos pontos é inválida.",
      path: ["punches"],
    },
  );
