"use client";

import { TableCell, TableRow } from "@mui/material";
import { TableBodyRowProps } from "../../types";
import TableModalControler from "../../Modal/TableModalControler/TableModalControler";
import { JustificationByDayType } from "@/core/justification/justification.types";

export default function TableRowDesktop({
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
      <TableCell align="center">{clockIn}</TableCell>
      <TableCell align="center">{startLunch}</TableCell>
      <TableCell align="center">{endLunch}</TableCell>
      <TableCell align="center">{clockOut}</TableCell>
      <TableCell align="center">{workedTime}</TableCell>
      <TableCell align="center" sx={{ color: color }}>
        {overUnder.timeStr}
      </TableCell>
      <TableCell align="center">
        <TableModalControler day={day} workTime={workTime} justification={justificationData} />
      </TableCell>
    </TableRow>
  );
}
