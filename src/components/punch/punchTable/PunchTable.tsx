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
import TableRowDesktop from "./Desktop/TableRowDesktop/TableRowDesktop";
import TableBodyRowMobile from "./Mobile/TableBodyRowMobile";
import { overtimeUndertime } from "@/core/punch/punch.reports";
import { PunchTableProps } from "./types";

export default function PunchTable({
  punchesPerDay,
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
        maxWidth: isMobile ? 600 : 1000,
      }}
    >
      <Table
        stickyHeader
        sx={{ minWidth: isMobile ? 200 : 400 }}
        arial-label="tabela simples"
      >
        {isDesktop && <TableHeadDesktop isModal={false} />}
        {isMobile && <TableHeadMobile />}
        <TableBody>
          {punchesPerDay.map((day) => {
            const daySchedule = dailySchedulesTime.find(
              (schedule) => schedule.dayOfWeek === day.dayOfWeek.day
            );

            const workTime = daySchedule ? daySchedule.workTime : 0;
            const overUnder = overtimeUndertime(workTime, day.workedTime.time);

            let color = "";
            if (overUnder.overtime && !overUnder.undertime) {
              color = "green";
            } else if (!overUnder.overtime && overUnder.undertime) {
              color = "red";
            }

            return isMobile && !isDesktop ? (
              <TableBodyRowMobile
                key={day.date}
                day={day}
                overUnder={overUnder}
                color={color}
              />
            ) : (
              <TableRowDesktop
                key={day.date}
                day={day}
                overUnder={overUnder}
                color={color}
                workTime={workTime}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
