"use client";

import { getPunchIdTime } from "@/core/punch/punch.utils";
import { TableCell, TableRow, Typography } from "@mui/material";
import { PunchType } from "@prisma/client";
import { TableBodyRowProps } from "../../types";
import TableModalControler from "../../Modal/TableModalControler/TableModalControler";
import { getDayOfWeek, minutesToTimeString } from "@/lib/dateUtils";
import { JustificationByDayType } from "@/core/justification/justification.types";

export default function TableBodyRowMobile({
  day,
  overUnder,
  color,
  workTime,
  justification
}: TableBodyRowProps & { workTime: number, justification?: JustificationByDayType }) {
  const clockIn = getPunchIdTime(day.punches, PunchType.CLOCK_IN);
  const startLunch = getPunchIdTime(day.punches, PunchType.START_LUNCH);
  const endLunch = getPunchIdTime(day.punches, PunchType.END_LUNCH);
  const clockOut = getPunchIdTime(day.punches, PunchType.CLOCK_OUT);

  const dayOfWeek = getDayOfWeek(day.timestamp);
  const workedTime = minutesToTimeString(day.workedTime);

  const needJustification =  workedTime === "00:00" ? true : false
  const haveJustification = justification ? true : false 
  
  const justificationColor = needJustification ? haveJustification ? "rgba(0, 255, 0, 0.15)" : "rgba(255, 0, 0, 0.15)" : ""

  const justificationData = { 
    have: haveJustification, 
    need: needJustification, 
    justification
  }


  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, background: justificationColor }}>
      <TableCell component="th" scope="row">
        {dayOfWeek} <br /> {day.date.slice(0, 5)}
      </TableCell>
      <TableCell align="center" padding="none" sx={{ padding: "8px" }}>
        <div className="flex flex-col gap-1">
          <Typography align="center">{clockIn.time}</Typography>
          <Typography align="center">{clockOut.time}</Typography>
        </div>
      </TableCell>
      <TableCell align="center" padding="none" sx={{ padding: "8px" }}>
        <div className="flex flex-col gap-1">
          <Typography align="center">{startLunch.time}</Typography>
          <Typography align="center">{endLunch.time}</Typography>
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
