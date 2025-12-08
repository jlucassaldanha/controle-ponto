"use client";

import * as React from "react";
import ModalEditTable from "../ModalEditTable/ModalEditTable";
import EditIcon from "@mui/icons-material/Edit";
import { groupPunchesByDay } from "@/core/punch/punch.reports";
import { IconButton } from "@mui/material";

type TableModalControlerProps = {
  day: Awaited<ReturnType<typeof groupPunchesByDay>>[number]
  workTime: number
}

export default function TableModalControler({day, workTime}: TableModalControlerProps) {
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton aria-label="add" size="small" onClick={handleOpen}>
        <EditIcon fontSize="small"/>
      </IconButton>
      <ModalEditTable open={open} onClose={handleClose} day={day} workTime={workTime}/>
      </div>
  );
}
