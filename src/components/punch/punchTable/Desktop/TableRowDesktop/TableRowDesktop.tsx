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
  justifications = [],
}: TableBodyRowProps & { workTime: number }) {
  const clockIn = getPunchIdTime(day.punches, PunchType.CLOCK_IN);
  const startLunch = getPunchIdTime(day.punches, PunchType.START_LUNCH);
  const endLunch = getPunchIdTime(day.punches, PunchType.END_LUNCH);
  const clockOut = getPunchIdTime(day.punches, PunchType.CLOCK_OUT);

  const dayOfWeek = getDayOfWeek(day.timestamp);
  const workedTime = minutesToTimeString(day.workedTime);

  const rowBgColor = color === "red" && workedTime === "00:00" ? "rgba(244, 67, 54, 0.1)" :  color === "green" && workedTime === "00:00" ? "rgba(76, 175, 80, 0.1)" : "inherit";

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        backgroundColor: rowBgColor,
      }}
    >
      <TableCell component="th" scope="row" sx={{ display: "flex", flexDirection: "column" }}>
        <span>{dayOfWeek}</span> 
        <span>{/*day.date.slice(0, 5)*/ day.date}</span>
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
        <TableModalControler
          day={day}
          workTime={workTime}
          justifications={justifications}
        />
      </TableCell>
    </TableRow>
  );
}
