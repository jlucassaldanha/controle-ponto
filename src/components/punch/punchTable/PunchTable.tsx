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
              (schedule) => schedule.dayOfWeek === day.dayOfWeek
            );

            const workTime = daySchedule ? daySchedule.workTime : 0;
            const overUnder = overtimeUndertime(workTime, day.workedTime);

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
                workTime={workTime}
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
