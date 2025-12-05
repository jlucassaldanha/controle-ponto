"use client";

import { Button, ButtonGroup, TableCell, TableRow } from "@mui/material";
//import { PunchType } from "@prisma/client";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { upsertPunchesAction } from "@/actions/punch.action";
import AddPunchCell from "../AddPunchCell/AddPunchCell";

export default function TableModalRow({ onClose }: { onClose: () => void }) {
  const [editedValues, setEditedValues] = useState<Record<string, Date>>({});
  const [dateValue, setDateValue] = useState("");
  const [clockInValue, setClockInValue] = useState("");
  const [clockOutValue, setClockOutValue] = useState("");
  const [startLunchValue, setStartLunchValue] = useState("");
  const [endLunchValue, setEndLunchValue] = useState("");

  /*const punchData = (type: PunchType) => {
    const safeId = `TEMP::${type}`;
    const safeTime = "00:00";

    return { id: safeId, time: safeTime, type };
  };*/

  const onCancel = () => {
    onClose();
    setEditedValues({});
  };

  const onSave = async () => {
    try {
      const result = await upsertPunchesAction(editedValues);
      if (result.success) {
        setEditedValues({});
      } else {
        console.log(result.error, result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateChange = (value: string) => {
    setDateValue(value);
  };
  
  const handleClockInChange = (value: string) => {
    setClockInValue(value);
  };
  
  const handleClockOutChange = (value: string) => {
    setClockOutValue(value);
  };
  
  const handleStartLunchChange = (value: string) => {
    setStartLunchValue(value);
  };

  const handleEndLunchChange = (value: string) => {
    setEndLunchValue(value);
  };

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <AddPunchCell
        dateOrTime="date"
        currentValue={dateValue}
        onChange={handleDateChange}
      />
      <AddPunchCell
        dateOrTime="time"
        currentValue={clockInValue}
        onChange={handleClockInChange}
      />
      <AddPunchCell
        dateOrTime="time"
        currentValue={startLunchValue}
        onChange={handleStartLunchChange}
      />
      <AddPunchCell
        dateOrTime="time"
        currentValue={endLunchValue}
        onChange={handleEndLunchChange}
      />
      <AddPunchCell
        dateOrTime="time"
        currentValue={clockOutValue}
        onChange={handleClockOutChange}
      />
      <TableCell align="center">
        --:--
      </TableCell>
      <TableCell align="center" sx={{ color: "red" }}>
        --:--
      </TableCell>
      <TableCell align="center">
        <ButtonGroup variant="outlined" aria-label="save-cancel">
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
