"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableHeadDesktop from "./Desktop/TableHeadDesktop/TableHeadDesktop";
import TableHeadMobile from "./Mobile/TableHeadMobile";
import { overtimeUndertime } from "@/core/punch/punch.reports";
import { PunchTableProps } from "./types";
import { formatDate } from "@/lib/dateUtils";
import TableRowFather from "./TableRowFather/TableRowFather";
import CreatePunchRow from "../CreatePunchRow/CreatePunchRow";

export default function PunchTable({
  punchesPerDay,
  dailySchedulesTime,
  justifications
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

            const dayJustification = justifications.find(
              (justification) => formatDate(justification.date) === day.date
            )
            
            return (
              <TableRowFather
                isMobile={isMobile && !isDesktop}
                key={day.date}
                day={day}
                overUnder={overUnder}
                color={color}
                workTime={workTime}
                justification={dayJustification}
              />
            )})}
        </TableBody>
        <TableFooter 
          sx={{ 
            position: 'sticky', 
            bottom: 0, 
            left: 0, 
            zIndex: 2, 
            backgroundColor: 'background.paper',
            fontWeight: 'bold' 
          }}
          >
          <CreatePunchRow />
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
