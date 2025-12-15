"use client";

import { getPunchIdTime } from "@/core/punch/punch.utils";
import { TableCell, TableRow } from "@mui/material";
import { PunchType } from "@prisma/client";
import { TableBodyRowProps } from "../../types";
import TableModalControler from "../../Modal/TableModalControler/TableModalControler";
import { getDayOfWeek, minutesToTimeString } from "@/lib/dateUtils";

export default function TableRowDesktop({
  day,
  overUnder,
  color,
  workTime,
}: TableBodyRowProps & { workTime: number }) {
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
        <TableModalControler day={day} workTime={workTime} />
      </TableCell>
    </TableRow>
  );
}
