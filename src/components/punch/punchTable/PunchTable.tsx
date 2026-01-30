"use client";

import {
  Table,
  TableBody,
  TableContainer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableHeadDesktop from "./Desktop/TableHeadDesktop/TableHeadDesktop";
import TableHeadMobile from "./Mobile/TableHeadMobile";
import { overtimeUndertime } from "@/core/punch/punch.reports";
import { PunchTableProps } from "./types";
import TableBodyRowMobile from "./Mobile/TableRowMobile/TableRowMobile";
import TableRowDesktop from "./Desktop/TableRowDesktop/TableRowDesktop";
import { da } from "zod/locales";

export default function PunchTable({
  punchesPerDay,
  justifications,
  dailySchedulesTime,
}: PunchTableProps) {
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TableContainer
      component={Paper}
      sx={{
        position: "relative",
        maxHeight: 400,
        width: "100%",
        margin: "0 auto",
        display: "block",
        maxWidth: isMobile ? "95%" : 800,
      }}
    >
      <Table
        stickyHeader
        size="small"
        sx={{ minWidth: isMobile ? 200 : 400 }}
        arial-label="tabela simples"
      >
        {isDesktop && <TableHeadDesktop isModal={false} />}
        {isMobile && <TableHeadMobile />}
        <TableBody>
          {punchesPerDay.map((day) => {
            const daySchedule = dailySchedulesTime.find(
              (schedule) => schedule.dayOfWeek === day.dayOfWeek,
            );

            const workTime = daySchedule ? daySchedule.workTime : 0;
            const overUnder = overtimeUndertime(workTime, day.workedTime);

            const dayJustification = justifications.find((justification) => {
              const justDay = justification.date
                .getDate()
                .toString()
                .padStart(2, "0");
              const justMonth = (justification.date.getMonth() + 1)
                .toString()
                .padStart(2, "0");
              const justYear = justification.date.getFullYear();
              const justDateStr = `${justDay}/${justMonth}/${justYear}`;
              return justDateStr === day.date;
            });

            console.log(day.date, dayJustification);

            let color = "";
            if (overUnder.undertime) {
              if (dayJustification && dayJustification.timeMinutes > 0) {
                color = "green";
              } else {
                color = "red";
              }
            } else if (overUnder.overtime) {
              color = "green";
            }

            return isMobile && !isDesktop ? (
              <TableBodyRowMobile
                key={day.date}
                day={day}
                overUnder={overUnder}
                color={color}
                workTime={workTime}
                justifications={justifications}
              />
            ) : (
              <TableRowDesktop
                key={day.date}
                day={day}
                overUnder={overUnder}
                color={color}
                workTime={workTime}
                justifications={justifications}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
