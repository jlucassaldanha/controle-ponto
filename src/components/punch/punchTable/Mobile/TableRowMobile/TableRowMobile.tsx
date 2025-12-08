"use client";

import { getPunchIdTime } from "@/core/punch/punch.utils";
import { TableCell, TableRow, Typography } from "@mui/material";
import { PunchType } from "@prisma/client";
import { TableBodyRowProps } from "../../types";
import TableModalControler from "../../Desktop/Modal/TableModalControler/TableModalControler";

export default function TableBodyRowMobile({
  day,
  overUnder,
  color,
  workTime
}: TableBodyRowProps & {workTime: number}) {
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
        <div className="flex flex-col gap-1">
          <Typography align="center">
            {clockIn.time}
          </Typography>
          <Typography align="center">
            {clockOut.time}
          </Typography>
        </div>
      </TableCell>
      <TableCell align="center">
        <div className="flex flex-col gap-1">
          <Typography align="center">
            {startLunch.time}
          </Typography>
          <Typography align="center">
            {endLunch.time}
          </Typography>
        </div>
      </TableCell>
      <TableCell align="center">{day.workedTime.timeString}</TableCell>
      <TableCell align="center" sx={{ color: color }}>
        {overUnder.timeStr}
      </TableCell>
      <TableCell align="center">
        <TableModalControler day={day} workTime={workTime} />
      </TableCell>
    </TableRow>
  );
}
