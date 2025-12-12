"use client";

import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { groupPunchesByDay2 } from "@/core/punch/punch.reports";
import { IconButton } from "@mui/material";
import ModalEditTable2 from "../ModalEditTable/ModalEditTable2";

type TableModalControlerProps = {
  day: Awaited<ReturnType<typeof groupPunchesByDay2>>[number];
  workTime: number;
};

export default function TableModalControler2({
  day,
  workTime,
}: TableModalControlerProps) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton aria-label="add" size="small" onClick={handleOpen}>
        <EditIcon fontSize="small" />
      </IconButton>
      <ModalEditTable2
        open={open}
        onClose={handleClose}
        day={day}
        workTime={workTime}
      />
    </div>
  );
}
