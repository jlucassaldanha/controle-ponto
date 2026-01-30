import { upsertPunchesAction } from "@/actions/punch.action";
import { fullDayJustificationAction } from "@/actions/justification.actions";
import {
  groupPunchesByDay,
  overtimeUndertime,
} from "@/core/punch/punch.reports";
import { getPunchIdTime } from "@/core/punch/punch.utils";
import { JustificationByDayType } from "@/core/justification/justification.types";
import {
  formatTime,
  getTimeMinutes,
  minutesToTimeString,
} from "@/lib/dateUtils";
import { PunchType } from "@prisma/client";
import { useEffect, useState } from "react";

export function useEditRow(
  day: Awaited<ReturnType<typeof groupPunchesByDay>>[number],
  workTime: number,
  onClose: () => void,
  justifications: JustificationByDayType[] = [],
) {
  const [editedValues, setEditedValues] = useState<Record<string, Date>>({});
  const [workedTime, setWorkedTime] = useState("");
  const [overUnder, setOverUnder] = useState("");
  const [color, setColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getPunchData = (type: PunchType) => {
    const punchData = getPunchIdTime(day.punches, type);

    const safeId = punchData.id || `TEMP::${type}`;
    const safeTime = punchData.time || "00:00";

    return { id: safeId, time: safeTime, type };
  };

  const clockIn = getPunchData(PunchType.CLOCK_IN);
  const startLunch = getPunchData(PunchType.START_LUNCH);
  const endLunch = getPunchData(PunchType.END_LUNCH);
  const clockOut = getPunchData(PunchType.CLOCK_OUT);

  const onCancel = () => {
    onClose();
    setEditedValues({});
  };

  const dayJustification = justifications.find(
    (j) => j.date.toDateString() === new Date(day.timestamp).toDateString(),
  );

  const toggleJustification = async () => {
    setIsLoading(true);
    try {
      // Construir data no formato correto para evitar problemas de timezone
      // day.date é no formato DD/MM/YYYY
	  console.log("Toggling justification for date:", day.date);
      const [dayNum, monthNum, yearNum] = day.date.split("/").map(Number);
      const dateToSend = new Date(yearNum, monthNum - 1, dayNum);
	  console.log("Constructed date:", dateToSend);
      await fullDayJustificationAction(dateToSend, workTime);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSave = async () => {
    try {
      const result = await upsertPunchesAction(editedValues);
      if (result.success) {
        onClose();
        setEditedValues({});
      } else {
        console.log(result.error, result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePunchChange = (id: string, newTime: string) => {
    const newTimestamp = new Date(day.timestamp);

    newTimestamp.setHours(Number(newTime.slice(0, 2)));
    newTimestamp.setMinutes(Number(newTime.slice(3)));

    setEditedValues((prev) => ({
      ...prev,
      [id]: newTimestamp,
    }));
  };

  const getDisplayTime = (id: string) => {
    const editedTime = editedValues[id];
    if (editedTime) {
      return formatTime(editedTime);
    }
    return undefined;
  };

  useEffect(() => {
    const resolveTime = (id: string, originalTime: string) => {
      return getDisplayTime(id) || originalTime || "00:00";
    };

    const cInStr = resolveTime(clockIn.id, clockIn.time);
    const cOutStr = resolveTime(clockOut.id, clockOut.time);
    const lInStr = resolveTime(startLunch.id, startLunch.time);
    const lOutStr = resolveTime(endLunch.id, endLunch.time);

    const minutesIn = getTimeMinutes(cInStr);
    const minutesOut = getTimeMinutes(cOutStr);
    const journey = minutesOut - minutesIn;

    const minutesLIn = getTimeMinutes(lInStr);
    const minutesLOut = getTimeMinutes(lOutStr);
    const lunch = minutesLOut - minutesLIn;

    const total = journey - lunch;

    const totalWorkedTime = minutesToTimeString(total);
    setWorkedTime(totalWorkedTime);

    const itsOverUnder = overtimeUndertime(workTime, total);
    if (itsOverUnder.overtime && !itsOverUnder.undertime) {
      setColor("green");
    } else if (!itsOverUnder.overtime && itsOverUnder.undertime) {
      setColor("red");
    }
    setOverUnder(itsOverUnder.timeStr);
  }, [
    editedValues,
    clockIn.time,
    clockOut.time,
    startLunch.time,
    endLunch.time,
  ]);

  return {
    workedTime,
    overUnder,
    color,
    clockIn,
    clockOut,
    startLunch,
    endLunch,
    getDisplayTime,
    onCancel,
    onSave,
    handlePunchChange,
    hasJustification: !!dayJustification,
    toggleJustification,
    isLoadingJustification: isLoading,
  };
}
