import { z } from 'zod'
import { PunchType } from "@prisma/client"

// 1. Regex melhorada para já validar horas (00-23) e minutos (00-59)
// Isso elimina a necessidade do transform com split e matemática manual.
export const timeStringSchema = z.string()
    .regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Horário deve ser válido no formato HH:MM." })

// 2. Mantemos a data como string na validação primária
export const dateStringSchema = z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Data deve estar no formato aaaa-mm-dd." })

export const punchSchema = z.object({
    time: timeStringSchema,
    type: z.enum([
        PunchType.CLOCK_IN,
        PunchType.START_LUNCH,
        PunchType.END_LUNCH,
        PunchType.CLOCK_OUT,
    ], { message: "Valores inválidos." }),
})

export const addPunchesSchema = z.object({
    date: dateStringSchema,
    punches: z.array(punchSchema),
})
    .transform((data) => {
        const newPunches = data.punches.map((punch) => {
            // Montamos a string ISO completa, INJETANDO O FUSO HORÁRIO (-03:00)
            // Isso força o JS a entender o horário absoluto, independente de onde o servidor está rodando.
            const isoString = `${data.date}T${punch.time}:00-03:00`
            
            return {
                type: punch.type, 
                timestamp: new Date(isoString)
            }
        })

        return {
            // Caso precise da data base como objeto Date, também aplicamos o fuso à meia-noite
            date: new Date(`${data.date}T00:00:00-03:00`), 
            punches: newPunches
        }
    })
    // Os seus refines originais continuam funcionando PERFEITAMENTE aqui para baixo, 
    // porque eles usam punch.type e a comparação matemática de timestamp.getTime(),
    // que agora estará 100% correta.
    .refine((data) => {
        const types = data.punches.map((punche) => punche.type)
        const uniqueTypes = new Set(types)

        return uniqueTypes.size === types.length
    }, { message: "Não deve haver pontos repetidos para o mesmo dia.", path: ["punches"] })
    .refine((data) => {
        const types = data.punches.map(p => p.type);
        const hasStartLunch = types.includes(PunchType.START_LUNCH);
        const hasEndLunch = types.includes(PunchType.END_LUNCH);
        
        return hasStartLunch === hasEndLunch;
    }, { message: "Início e Fim do Almoço devem ser registrados em conjunto.", path: ["punches"] })
    .refine((data) => {
        if (data.punches.length === 0) return true;

        const sortedPunches = [...data.punches].sort(
            (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
        );

        const types = sortedPunches.map(p => p.type);

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
    }, { message: "A ordem ou combinação dos pontos é inválida.", path: ["punches"] });