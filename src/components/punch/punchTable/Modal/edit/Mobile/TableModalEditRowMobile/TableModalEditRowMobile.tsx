"use client";

import { TableCell, TableRow, Tooltip } from "@mui/material";
import { groupPunchesByDay } from "@/core/punch/punch.reports";
import AddPunchCellMobile from "../../../../Mobile/AddPunchCellMobile/AddPunchCellMobile";
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

export default function TableModalEditRowMobile({
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
  const compactCellStyle = {
    padding: "8px",
    fontSize: "0.75rem",
  };

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
      <TableCell
        component="th"
        scope="row"
        sx={{ ...compactCellStyle, whiteSpace: "nowrap" }}
      >
        {dayOfWeek} <br /> {day.date.slice(0, 5)}
      </TableCell>
      <TableCell align="center" sx={compactCellStyle}>
        <div className="flex flex-col gap-1">
          <Tooltip title="Entrada">
            <AddPunchCellMobile
              dateOrTime="time"
              currentValue={getDisplayTime(clockIn.id) || clockIn.time}
              onChange={(val) => handlePunchChange(clockIn.id, val)}
            />
          </Tooltip>
          <Tooltip title="Entrada almoço">
            <AddPunchCellMobile
              dateOrTime="time"
              currentValue={getDisplayTime(startLunch.id) || startLunch.time}
              onChange={(val) => handlePunchChange(startLunch.id, val)}
            />
          </Tooltip>
        </div>
      </TableCell>
      <TableCell align="center" sx={compactCellStyle}>
        <div className="flex flex-col gap-1">
          <Tooltip title="Saída">
            <AddPunchCellMobile
              dateOrTime="time"
              currentValue={getDisplayTime(clockOut.id) || clockOut.time}
              onChange={(val) => handlePunchChange(clockOut.id, val)}
            />
          </Tooltip> 
          <Tooltip title="Saída almoço">
            <AddPunchCellMobile
              dateOrTime="time"
              currentValue={getDisplayTime(endLunch.id) || endLunch.time}
              onChange={(val) => handlePunchChange(endLunch.id, val)}
            />
          </Tooltip>
        </div>
      </TableCell>
      <TableCell align="center" sx={compactCellStyle}>
        {workedTime}
      </TableCell>
      <TableCell align="center" sx={{ ...compactCellStyle, color: color }}>
        {overUnder}
      </TableCell>
    </TableRow>
  );
}
