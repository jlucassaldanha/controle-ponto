"use client";

import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { groupPunchesByDay } from "@/core/punch/punch.reports";
import { IconButton, Tooltip } from "@mui/material";
import ModalEditTable from "../ModalEditTable/ModalEditTable";
import FreeCancellationIcon from "@mui/icons-material/FreeCancellation";
import { fullDayJustificationAction } from "@/actions/justification.actions";
import { JustificationByDayType } from "@/core/justification/justification.types";

type TableModalControlerProps = {
  day: Awaited<ReturnType<typeof groupPunchesByDay>>[number];
  workTime: number;
  justification: {
    have: boolean;
    need: boolean;
    justification?: JustificationByDayType;
  };
};

export default function TableModalControler({
  day,
  workTime,
  justification,
}: TableModalControlerProps) {
  const [open, setOpen] = React.useState(false);
  const [loadingJustification, setLoadingJustification] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const justificationDate =
    justification.justification?.date.toISOString().split("T")[0] ||
    day.timestamp.toISOString().split("T")[0];

  const handleJustificationChange = async () => {
    setLoadingJustification(true);
    await fullDayJustificationAction(justificationDate, workTime);
    setLoadingJustification(false);
  };

  return (
    <div>
      <Tooltip title="Editar">
        <IconButton aria-label="add" size="small" onClick={handleOpen}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Abono">
        <IconButton
          aria-label="add"
          size="small"
          onClick={handleJustificationChange}
          disabled={!justification.need || loadingJustification}
          loading={loadingJustification}
        >
          <FreeCancellationIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <ModalEditTable
        open={open}
        onClose={handleClose}
        day={day}
        workTime={workTime}
      />
    </div>
  );
}
