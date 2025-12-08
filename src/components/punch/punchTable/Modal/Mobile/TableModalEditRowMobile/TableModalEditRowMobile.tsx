"use client";

import { Button, ButtonGroup, TableCell, TableRow } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { groupPunchesByDay } from "@/core/punch/punch.reports";
import { useEditRow } from "@/hooks/useEditRow";
import AddPunchCellMobile from "../AddPunchCellMobile/AddPunchCellMobile";

type TableModalEditRowProps = {
  day: Awaited<ReturnType<typeof groupPunchesByDay>>[number];
  workTime: number;
  onClose: () => void;
};

export default function TableModalEditRowMobile({
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
  } = useEditRow(day, workTime, onClose);

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {day.dayOfWeek.dayString} <br /> {day.date.slice(0, 5)}
      </TableCell>
      <TableCell align="center">
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
      <TableCell align="center">
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
      <TableCell align="center">
        {workedTime}
        </TableCell>
      <TableCell align="center" sx={{ color: color }}>
        {overUnder}
      </TableCell>
      <TableCell align="center">
        <ButtonGroup variant="outlined" orientation="vertical" aria-label="save-cancel">
          <Button aria-label="save" onClick={onSave}>
            <SaveIcon fontSize="small" />
          </Button>
          <Button aria-label="cancel" color="error" onClick={onCancel}>
            <CloseIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
}
