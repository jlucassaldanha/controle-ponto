"use client";

import { ButtonGroup, IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import AddPunchCell from "../AddPunchCell/AddPunchCell";
import { useState } from "react";

type TableModalEditRowProps = {
  onClose: () => void;
};

export default function TableModalCreateRow({
  onClose,
}: TableModalEditRowProps) {
  const [clockInTime, setClockInTime] = useState("00:00")
  const [clockOutTime, setClockOutTime] = useState("00:00")
  const [lunchInTime, setLunchInTime] = useState("00:00")
  const [lunchOutTime, setLunchOutTime] = useState("00:00")
  
  const todayDate = new Date()

  const [date, setDate] = useState(
    `${todayDate.getFullYear()}-${(todayDate.getMonth() + 1).toString().padStart(2, "0")}-${todayDate.getDate().toString().padStart(2, "0")}`
  )

  const [loadingSave, setLoadingSave] = useState(false)
  
  const onCancel = () => {
    onClose();
  };
  
  const onSave = async () => {
    setLoadingSave(true)
    onClose();
    setLoadingSave(false)
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !loadingSave) {
      onSave();
    }
  };

  return (
    <TableRow 
      onKeyDown={handleKeyDown}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <AddPunchCell
        dateOrTime="date"
        currentValue={date}
        onChange={(val) => setDate(val)}
      />
      <AddPunchCell
        dateOrTime="time"
        currentValue={clockInTime}
        onChange={(val) => setClockInTime(val)}
      />
      <AddPunchCell
        dateOrTime="time"
        currentValue={lunchInTime}
        onChange={(val) => setLunchInTime(val)}
      />
      <AddPunchCell
        dateOrTime="time"
        currentValue={lunchOutTime}
        onChange={(val) => setLunchOutTime(val)}
      />
      <AddPunchCell
        dateOrTime="time"
        currentValue={clockOutTime}
        onChange={(val) => setClockOutTime(val)}
      />
      <TableCell align="center">--:--</TableCell>
      <TableCell align="center" >--:--</TableCell>
      <TableCell align="center">
        <ButtonGroup variant="outlined" aria-label="save-cancel">
          <Tooltip title="Salvar">
            <IconButton 
              type="submit" 
              aria-label="save" 
              onClick={onSave}
              disabled={loadingSave} 
              loading={loadingSave}
              >
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
