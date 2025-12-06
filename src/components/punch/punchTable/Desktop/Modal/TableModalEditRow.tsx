"use client";

import { Button, ButtonGroup, TableCell, TableRow } from "@mui/material";
//import { PunchType } from "@prisma/client";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { upsertPunchesAction } from "@/actions/punch.action";
import AddPunchCell from "../AddPunchCell/AddPunchCell";
import { PunchType } from "@prisma/client";
import { formatTime } from "@/lib/dateUtils";
import { getPunchIdTime } from "@/core/punch/punch.utils";
import { groupPunchesByDay } from "@/core/punch/punch.reports";

export default function TableModalEditRow({ day, onClose }: { day: Awaited<ReturnType<typeof groupPunchesByDay>>[number],onClose: () => void }) {
  const [editedValues, setEditedValues] = useState<Record<string, Date>>({});
  
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

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {day.dayOfWeek.dayString} <br /> {day.date.slice(0, 5)}
      </TableCell>
      <AddPunchCell
        dateOrTime="time"
        currentValue={getDisplayTime(clockIn.id) || clockIn.time}
        onChange={(val) => handlePunchChange(clockIn.id, val)}
      />
      <AddPunchCell
        dateOrTime="time"
        currentValue={getDisplayTime(startLunch.id) || startLunch.time}
        onChange={(val) => handlePunchChange(startLunch.id, val)}
      />
      <AddPunchCell
        dateOrTime="time"
        currentValue={getDisplayTime(endLunch.id) || endLunch.time}
        onChange={(val) => handlePunchChange(clockIn.id, val)}
      />
      <AddPunchCell
        dateOrTime="time"
        currentValue={getDisplayTime(clockOut.id) || clockOut.time}
        onChange={(val) => handlePunchChange(clockOut.id, val)}
      />
      <TableCell align="center">
        {day.workedTime.timeString}
      </TableCell>
      <TableCell align="center">
        -
      </TableCell>
      <TableCell align="center">
        <ButtonGroup variant="outlined" aria-label="save-cancel">
          <Button aria-label="save" onClick={onSave}>
            <SaveIcon fontSize="small" />
          </Button>
          <Button aria-label="cancel" color="error" onClick={onCancel}>
            <CloseIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
}
