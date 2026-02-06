"use client";

import { ButtonGroup, IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import AddPunchCell from "../AddPunchCell/AddPunchCell";
import { groupPunchesByDay } from "@/core/punch/punch.reports";
import { useEditRow } from "@/hooks/useEditRow";
import { getDayOfWeek } from "@/lib/dateUtils";

type TableModalEditRowProps = {
  day: Awaited<ReturnType<typeof groupPunchesByDay>>[number];
  workTime: number;
  onClose: () => void;
};

export default function TableModalEditRow({
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

  const dayOfWeek = getDayOfWeek(day.timestamp);

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {dayOfWeek} <br /> {day.date.slice(0, 5)}
      </TableCell>
      <AddPunchCell
        dateOrTime="time"
        currentValue={getDisplayTime(clockIn.id) || clockIn.time}
        onChange={(val) => handlePunchChange(clockIn.id, val)}
      />
      <AddPunchCell
        dateOrTime="time"
        currentValue={getDisplayTime(startLunch.id) || startLunch.time}
        onChange={(val) => handlePunchChange(startLunch.id, val)}
      />
      <AddPunchCell
        dateOrTime="time"
        currentValue={getDisplayTime(endLunch.id) || endLunch.time}
        onChange={(val) => handlePunchChange(endLunch.id, val)}
      />
      <AddPunchCell
        dateOrTime="time"
        currentValue={getDisplayTime(clockOut.id) || clockOut.time}
        onChange={(val) => handlePunchChange(clockOut.id, val)}
      />
      <TableCell align="center">{workedTime}</TableCell>
      <TableCell align="center" sx={{ color: color }}>
        {overUnder}
      </TableCell>
      <TableCell align="center">
        <ButtonGroup variant="outlined" aria-label="save-cancel">
          <Tooltip title="Salvar">
            <IconButton aria-label="save" onClick={onSave}>
              <SaveIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Calcelar">
            <IconButton aria-label="cancel" color="error" onClick={onCancel}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
}
