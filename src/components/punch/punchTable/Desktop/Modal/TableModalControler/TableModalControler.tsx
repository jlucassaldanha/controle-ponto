"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ModalEditTable from "../ModalEditTable/ModalEditTable";
import EditIcon from "@mui/icons-material/Edit";
import { groupPunchesByDay } from "@/core/punch/punch.reports";

export default function TableModalControler({day}: {day: Awaited<ReturnType<typeof groupPunchesByDay>>[number]}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button aria-label="add" onClick={handleOpen}>
        <EditIcon />
      </Button>
      <ModalEditTable open={open} onClose={handleClose} day={day}/>
    </div>
  );
}
