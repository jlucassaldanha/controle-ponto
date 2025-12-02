"use client";

import { getPunchIdTime } from "@/core/punch/punch.utils";
import { Button, ButtonGroup, TableCell, TableRow } from "@mui/material";
import { PunchType } from "@prisma/client";
import { TableBodyRowProps } from "../types";
import { useState } from "react";
import { formatTime } from "@/lib/dateUtils";
import { upsertPunchesAction } from "@/actions/punch.action";
import PunchCellMobile from "./PunchCellMobile";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

export default function TableBodyRowMobile({
  day,
  overUnder,
  color,
}: TableBodyRowProps) {
  const [isEditing, setIsEditing] = useState(false);
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

  const handlePunchChange = (id: string, newTime: string) => {
    const newTimestamp = new Date(day.timestamp);

    newTimestamp.setHours(Number(newTime.slice(0, 2)));
    newTimestamp.setMinutes(Number(newTime.slice(3)));

    console.log(newTimestamp);
    console.log(day.timestamp);
    console.log(day.date);

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

  const onCancel = () => {
    setIsEditing(false);
    setEditedValues({});
  };

  const onSave = async () => {
    try {
      const result = await upsertPunchesAction(editedValues);
      if (result.success) {
        setIsEditing(false);
        setEditedValues({});
      } else {
        console.log(result.error, result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {day.dayOfWeek.dayString} <br /> {day.date.slice(0, 5)}
      </TableCell>

      <TableCell align="center">
        <div className="flex flex-col gap-1">
          <PunchCellMobile
            punchTime={clockIn.time}
            isEditing={isEditing}
            currentValue={getDisplayTime(clockIn.id)}
            onChange={(val) => handlePunchChange(clockIn.id, val)}
          />
          <PunchCellMobile
            punchTime={startLunch.time}
            isEditing={isEditing}
            currentValue={getDisplayTime(startLunch.id)}
            onChange={(val) => handlePunchChange(startLunch.id, val)}
          />
        </div>
      </TableCell>
      <TableCell align="center">
        <div className="flex flex-col gap-1">
          <PunchCellMobile
            punchTime={clockOut.time}
            isEditing={isEditing}
            currentValue={getDisplayTime(clockOut.id)}
            onChange={(val) => handlePunchChange(clockOut.id, val)}
          />
          <PunchCellMobile
            punchTime={endLunch.time}
            isEditing={isEditing}
            currentValue={getDisplayTime(endLunch.id)}
            onChange={(val) => handlePunchChange(endLunch.id, val)}
          />
        </div>
      </TableCell>
      <TableCell align="center">{day.workedTime.timeString}</TableCell>
      <TableCell align="center" sx={{ color: color }}>
        {overUnder.timeStr}
      </TableCell>
      {isEditing ? (
        <TableCell align="center">
          <ButtonGroup
            variant="outlined"
            orientation="vertical"
            aria-label="save-cancel"
          >
            <Button aria-label="save" onClick={onSave}>
              <SaveIcon fontSize="small" />
            </Button>
            <Button aria-label="cancel" color="error" onClick={onCancel}>
              <CloseIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        </TableCell>
      ) : (
        <TableCell align="center">
          <Button
            variant="outlined"
            aria-label="edit"
            onClick={() => setIsEditing(true)}
          >
            <EditIcon />
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
}
