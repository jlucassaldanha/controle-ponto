"use client";

import { ButtonGroup, IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import AddPunchCell from "../AddPunchCell/AddPunchCell";
import { useEffect, useState } from "react";
import { PunchFieldType } from "@/components/punch/types";
import { PunchType } from "@prisma/client";
import { addPunchesDirectAction } from "@/actions/punch.action";
import { addPunchesActionForm } from "@/actions/actions.types";

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

  const [punchesFields, setPunchesFields] = useState<PunchFieldType[]>([])

  const [createPunchResponse, setCreatePunchResponse] = useState<addPunchesActionForm>()
  
  const todayDate = new Date()

  const [date, setDate] = useState(
    `${todayDate.getFullYear()}-${(todayDate.getMonth() + 1).toString().padStart(2, "0")}-${todayDate.getDate().toString().padStart(2, "0")}`
  )

  useEffect(() => {
    setPunchesFields([{
      id: new Date().toString(),
      time: clockInTime,
      type: PunchType.CLOCK_IN
    },
    {
      id: new Date().toString(),
      time: clockOutTime,
      type: PunchType.CLOCK_OUT
    },
    {
      id: new Date().toString(),
      time: lunchInTime,
      type: PunchType.START_LUNCH
    },
    {
      id: new Date().toString(),
      time: lunchOutTime,
      type: PunchType.END_LUNCH
    }])
  }, [date, clockInTime, clockOutTime, lunchInTime, lunchOutTime])

  const [loadingSave, setLoadingSave] = useState(false)
  
  const onCancel = () => {
    onClose();
  };
  
  const onSave = async () => {
    setLoadingSave(true)
    console.log(date, punchesFields)
    try {
      const response = await addPunchesDirectAction({date, punches: punchesFields})
      setCreatePunchResponse(response)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
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
