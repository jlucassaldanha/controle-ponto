"use client";

import { TableCell, TableRow, Typography } from "@mui/material";
import { TableBodyRowProps } from "../../types";
import TableModalControler from "../../Modal/TableModalControler/TableModalControler";
import { JustificationByDayType } from "@/core/justification/justification.types";

export default function TableRowMobile({
  day,
  overUnder,
  color,
  workTime,
  justificationData,
  dayOfWeek,
  workedTime,
  clockIn,
  clockOut,
  startLunch,
  endLunch
}: TableBodyRowProps & { 
  workTime: number, 
  justificationData: {
    have: boolean;
    need: boolean;
    justification?: JustificationByDayType | undefined
    justificationColor: string,
  }, 
  dayOfWeek: string,  
  workedTime: string,
  clockIn: string,
  clockOut: string,
  startLunch: string,
  endLunch: string,
}) {

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, background: justificationData.justificationColor }}>
      <TableCell component="th" scope="row">
        {dayOfWeek} <br /> {day.date.slice(0, 5)}
      </TableCell>
      <TableCell align="center" padding="none" sx={{ padding: "8px" }}>
        <div className="flex flex-col gap-1">
          <Typography align="center">{clockIn}</Typography>
          <Typography align="center">{startLunch}</Typography>
        </div>
      </TableCell>
      <TableCell align="center" padding="none" sx={{ padding: "8px" }}>
        <div className="flex flex-col gap-1">
          <Typography align="center">{clockOut}</Typography>
          <Typography align="center">{endLunch}</Typography>
        </div>
      </TableCell>
      <TableCell align="center" padding="none" sx={{ padding: "8px" }}>
        {workedTime}
      </TableCell>
      <TableCell align="center" sx={{ color: color }}>
        {overUnder.timeStr}
      </TableCell>
      <TableCell align="center" padding="none">
        <TableModalControler day={day} workTime={workTime} justification={justificationData}/>
      </TableCell>
    </TableRow>
  );
}
