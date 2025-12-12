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
import { PunchTableProps2 } from "./types";
import TableBodyRowMobile2 from "./Mobile/TableRowMobile/TableRowMobile2";
import TableRowDesktop2 from "./Desktop/TableRowDesktop/TableRowDesktop2";

export default function PunchTable2({
  punchesPerDay,
  dailySchedulesTime,
}: PunchTableProps2) {
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
              <TableBodyRowMobile2
                key={day.date}
                day={day}
                overUnder={overUnder}
                color={color}
                workTime={workTime}
              />
            ) : (
              <TableRowDesktop2
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
