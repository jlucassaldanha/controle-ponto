"use client";

import { ButtonGroup, IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import AddPunchCell from "../AddPunchCell/AddPunchCell";
import { groupPunchesByDay } from "@/core/punch/punch.reports";
import { useEditRow } from "@/hooks/useEditRow";
import { getDayOfWeek } from "@/lib/dateUtils";
import { JustificationByDayType } from "@/core/justification/justification.types";
import FreeCancellationIcon from '@mui/icons-material/FreeCancellation';

type TableModalEditRowProps = {
  day: Awaited<ReturnType<typeof groupPunchesByDay>>[number];
  workTime: number;
  onClose: () => void;
  justifications: JustificationByDayType[];
};

export default function TableModalEditRow({
  day,
  workTime,
  onClose,
  justifications,
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
    hasJustification,
    toggleJustification,
    isLoadingJustification,
  } = useEditRow(day, workTime, onClose, justifications);

  const dayOfWeek = getDayOfWeek(day.timestamp);

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row" sx={{ display: "flex", flexDirection: "column" }}>
        <span>{dayOfWeek}</span> 
        <span>{/*day.date.slice(0, 5)*/ day.date}</span>
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
          <Tooltip title="Justificar">
            <IconButton
              aria-label="justification"
              onClick={() => toggleJustification(day.date)}
              disabled={isLoadingJustification || workedTime !== "00:00"}
            >
              <FreeCancellationIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Salvar">
            <IconButton aria-label="save" onClick={onSave}>
              <SaveIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cancelar">
            <IconButton aria-label="cancel" color="error" onClick={onCancel}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
}
