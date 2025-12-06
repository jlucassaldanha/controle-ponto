"use client";

import { getPunchIdTime } from "@/core/punch/punch.utils";
import { TableCell, TableRow } from "@mui/material";
import { PunchType } from "@prisma/client";
import { TableBodyRowProps } from "../../types";
import TableModalControler from "../Modal/TableModalControler/TableModalControler";

export default function TableRowDesktop({
  day,
  overUnder,
  color,
}: TableBodyRowProps) {

  const clockIn = getPunchIdTime(day.punches, PunchType.CLOCK_IN);
  const startLunch = getPunchIdTime(day.punches, PunchType.START_LUNCH);
  const endLunch = getPunchIdTime(day.punches, PunchType.END_LUNCH);
  const clockOut = getPunchIdTime(day.punches, PunchType.CLOCK_OUT);

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {day.dayOfWeek.dayString} <br /> {day.date.slice(0, 5)}
      </TableCell>
      <TableCell align="center">
        {clockIn.time}
      </TableCell>
      <TableCell align="center">
        {startLunch.time}
      </TableCell>
      <TableCell align="center">
        {endLunch.time}
      </TableCell>
      <TableCell align="center">
        {clockOut.time}
      </TableCell>
      <TableCell align="center">
        {day.workedTime.timeString}
      </TableCell>
      <TableCell align="center" sx={{ color: color }}>
        {overUnder.timeStr}
      </TableCell>
      <TableCell align="center">
        <TableModalControler day={day}/>
      </TableCell>
    </TableRow>
  );
}
