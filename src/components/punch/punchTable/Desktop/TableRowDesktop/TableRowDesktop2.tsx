"use client";

import { getPunchIdTime } from "@/core/punch/punch.utils";
import { TableCell, TableRow } from "@mui/material";
import { PunchType } from "@prisma/client";
import { TableBodyRowProps2 } from "../../types";
import TableModalControler2 from "../../Modal/TableModalControler/TableModalControler2";
import { getDayOfWeek, minutesToTimeString } from "@/lib/dateUtils";

export default function TableRowDesktop2({
  day,
  overUnder,
  color,
  workTime,
}: TableBodyRowProps2 & { workTime: number }) {
  const clockIn = getPunchIdTime(day.punches, PunchType.CLOCK_IN);
  const startLunch = getPunchIdTime(day.punches, PunchType.START_LUNCH);
  const endLunch = getPunchIdTime(day.punches, PunchType.END_LUNCH);
  const clockOut = getPunchIdTime(day.punches, PunchType.CLOCK_OUT);

  const dayOfWeek = getDayOfWeek(day.timestamp);
  const workedTime = minutesToTimeString(day.workedTime);
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {dayOfWeek} <br /> {day.date.slice(0, 5)}
      </TableCell>
      <TableCell align="center">{clockIn.time}</TableCell>
      <TableCell align="center">{startLunch.time}</TableCell>
      <TableCell align="center">{endLunch.time}</TableCell>
      <TableCell align="center">{clockOut.time}</TableCell>
      <TableCell align="center">{workedTime}</TableCell>
      <TableCell align="center" sx={{ color: color }}>
        {overUnder.timeStr}
      </TableCell>
      <TableCell align="center">
        <TableModalControler2 day={day} workTime={workTime} />
      </TableCell>
    </TableRow>
  );
}
