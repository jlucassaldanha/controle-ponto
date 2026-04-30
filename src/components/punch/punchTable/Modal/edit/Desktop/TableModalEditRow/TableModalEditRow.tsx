"use client";

import { ButtonGroup, IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import AddPunchCell from "../AddPunchCell/AddPunchCell";
import { groupPunchesByDay } from "@/core/punch/punch.reports";
import { useEditRow } from "@/hooks/useEditRow";
import { getDayOfWeek } from "@/lib/dateUtils";
import { $Enums } from "@prisma/client";

type TableModalEditRowProps = {
  day: Awaited<ReturnType<typeof groupPunchesByDay>>[number];
  workTime: number;
  onClose: () => void;
  workedTime: string;
  overUnder: string;
  color: string;
  clockIn: {
    id: string;
    time: string;
    type: $Enums.PunchType;
  };
  clockOut: {
    id: string;
    time: string;
    type: $Enums.PunchType;
  };
  startLunch: {
    id: string;
    time: string;
    type: $Enums.PunchType;
  };
  endLunch: {
    id: string;
    time: string;
    type: $Enums.PunchType;
  };
  loadingSave: boolean;
  getDisplayTime: (id: string) => string | undefined;
  onSave: () => Promise<void>;
  handlePunchChange: (id: string, newTime: string) => void;
};

export default function TableModalEditRow({
  day,
  workedTime,
  overUnder,
  color,
  clockIn,
  clockOut,
  startLunch,
  endLunch,
  loadingSave,
  getDisplayTime,
  onSave,
  handlePunchChange,
}: TableModalEditRowProps) {
  const dayOfWeek = getDayOfWeek(day.timestamp);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !loadingSave) {
      onSave();
    }
  };

  return (
    <TableRow 
      onKeyDown={handleKeyDown}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {dayOfWeek} <br /> {day.date.slice(0, 5)}
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
        onChange={(val) => handlePunchChange(endLunch.id, val)}
      />
      <AddPunchCell
        dateOrTime="time"
        currentValue={getDisplayTime(clockOut.id) || clockOut.time}
        onChange={(val) => handlePunchChange(clockOut.id, val)}
      />
      <TableCell align="center">{workedTime}</TableCell>
      <TableCell align="center" sx={{ color: color }}>
        {overUnder}
      </TableCell>
    </TableRow>
  );
}
