"use client";

import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { groupPunchesByDay } from "@/core/punch/punch.reports";
import { IconButton } from "@mui/material";
import ModalEditTable from "../ModalEditTable/ModalEditTable";
import { JustificationByDayType } from "@/core/justification/justification.types";

type TableModalControlerProps = {
  day: Awaited<ReturnType<typeof groupPunchesByDay>>[number];
  workTime: number;
  justifications: JustificationByDayType[];
};

export default function TableModalControler({
  day,
  workTime,
  justifications,
}: TableModalControlerProps) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton aria-label="add" size="small" onClick={handleOpen}>
        <EditIcon fontSize="small" />
      </IconButton>
      <ModalEditTable
        open={open}
        onClose={handleClose}
        day={day}
        workTime={workTime}
        justifications={justifications}
      />
    </div>
  );
}
