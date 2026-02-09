"use client";

import { getPunchIdTime } from "@/core/punch/punch.utils";
import { PunchType } from "@prisma/client";
import { TableBodyRowProps } from "../types";
import { getDayOfWeek, minutesToTimeString } from "@/lib/dateUtils";
import { JustificationByDayType } from "@/core/justification/justification.types";
import TableRowMobile from "../Mobile/TableRowMobile/TableRowMobile";
import TableRowDesktop from "../Desktop/TableRowDesktop/TableRowDesktop";

export default function TableRowFather({
	isMobile,
  day,
  overUnder,
  color,
  workTime,
  justification
}: TableBodyRowProps & { workTime: number, justification?: JustificationByDayType, isMobile: boolean }) {
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
	justification,
	justificationColor
  }

  return isMobile ?
	<TableRowMobile 
  		clockIn={clockIn.time}
  		clockOut={clockOut.time}
		startLunch={startLunch.time}
		endLunch={endLunch.time}
		dayOfWeek={dayOfWeek}
		justificationData={justificationData}
		color={color}
		day={day}
		overUnder={overUnder}
		workTime={workTime}
		workedTime={workedTime}
	/>
	: 
	<TableRowDesktop 
  		clockIn={clockIn.time}
  		clockOut={clockOut.time}
		startLunch={startLunch.time}
		endLunch={endLunch.time}
		dayOfWeek={dayOfWeek}
		justificationData={justificationData}
		color={color}
		day={day}
		overUnder={overUnder}
		workTime={workTime}
		workedTime={workedTime}
	/>
	
}
