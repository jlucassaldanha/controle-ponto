"use client";

import { ButtonGroup, IconButton, TableCell, TableRow } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { groupPunchesByDay2 } from "@/core/punch/punch.reports";
import { useEditRow2 } from "@/hooks/useEditRow2";
import AddPunchCellMobile from "../AddPunchCellMobile/AddPunchCellMobile";
import { getDayOfWeek } from "@/lib/dateUtils";

type TableModalEditRowProps = {
  day: Awaited<ReturnType<typeof groupPunchesByDay2>>[number];
  workTime: number;
  onClose: () => void;
};

export default function TableModalEditRowMobile2({
  day,
  workTime,
  onClose,
}: TableModalEditRowProps) {
  const {
    workedTime,
    overUnder,
    color,
    clockIn,
    clockOut,
    startLunch,
    endLunch,
    getDisplayTime,
    onCancel,
    onSave,
    handlePunchChange,
  } = useEditRow2(day, workTime, onClose);

  const compactCellStyle = {
    padding: "8px",
    fontSize: "0.75rem",
  };

  const dayOfWeek = getDayOfWeek(day.timestamp);

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell
        component="th"
        scope="row"
        sx={{ ...compactCellStyle, whiteSpace: "nowrap" }}
      >
        {dayOfWeek} <br /> {day.date.slice(0, 5)}
      </TableCell>
      <TableCell align="center" sx={compactCellStyle}>
        <div className="flex flex-col gap-1">
          <AddPunchCellMobile
            dateOrTime="time"
            currentValue={getDisplayTime(clockIn.id) || clockIn.time}
            onChange={(val) => handlePunchChange(clockIn.id, val)}
          />
          <AddPunchCellMobile
            dateOrTime="time"
            currentValue={getDisplayTime(startLunch.id) || startLunch.time}
            onChange={(val) => handlePunchChange(startLunch.id, val)}
          />
        </div>
      </TableCell>
      <TableCell align="center" sx={compactCellStyle}>
        <div className="flex flex-col gap-1">
          <AddPunchCellMobile
            dateOrTime="time"
            currentValue={getDisplayTime(endLunch.id) || endLunch.time}
            onChange={(val) => handlePunchChange(endLunch.id, val)}
          />
          <AddPunchCellMobile
            dateOrTime="time"
            currentValue={getDisplayTime(clockOut.id) || clockOut.time}
            onChange={(val) => handlePunchChange(clockOut.id, val)}
          />
        </div>
      </TableCell>
      <TableCell align="center" sx={compactCellStyle}>
        {workedTime}
      </TableCell>
      <TableCell align="center" sx={{ ...compactCellStyle, color: color }}>
        {overUnder}
      </TableCell>
      <TableCell align="center" sx={{ padding: "8px" }}>
        <ButtonGroup
          variant="text"
          orientation="vertical"
          size="small"
          aria-label="save-cancel"
        >
          <IconButton
            aria-label="save"
            onClick={onSave}
            sx={{ minWidth: "20px", padding: "2px" }}
          >
            <SaveIcon fontSize="small" sx={{ fontSize: 15 }} />
          </IconButton>
          <IconButton
            aria-label="cancel"
            color="error"
            onClick={onCancel}
            sx={{ minWidth: "20px", padding: "2px" }}
          >
            <CloseIcon fontSize="small" sx={{ fontSize: 15 }} />
          </IconButton>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
}
