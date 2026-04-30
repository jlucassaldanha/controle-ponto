"use client";

import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { groupPunchesByDay } from "@/core/punch/punch.reports";
import { Alert, IconButton, Snackbar, SnackbarCloseReason, Tooltip } from "@mui/material";
import ModalEditTable from "../ModalEditTable/ModalEditTable";
import FreeCancellationIcon from "@mui/icons-material/FreeCancellation";
import { fullDayJustificationAction } from "@/actions/justification.actions";
import { JustificationByDayType } from "@/core/justification/justification.types";
import ModalJustification from "../ModalJustification/ModalJustification";

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
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openJustification, setOpenJustification] = React.useState(false);
  const [loadingJustification, setLoadingJustification] = React.useState(false);
  const [justificationResponse, setJustificationResponse] = React.useState({ success: false, message: "" })
  const [openSnack, setOpenSnack] = React.useState(false)

  const handleCloseSnack = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnack(false)
  }

  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenJustification = () => setOpenJustification(true);
  const handleCloseJustification = () => setOpenJustification(false);

  const justificationDate =
    justification.justification?.date.toISOString().split("T")[0] ||
    day.timestamp.toISOString().split("T")[0];

  const handleJustificationChange = async (message: string) => {
    setLoadingJustification(true);
    const response = await fullDayJustificationAction(justificationDate, workTime - day.workedTime, message);
    
    setJustificationResponse(response)
    setOpenSnack(true)
    setLoadingJustification(false);

    return response;
  };

  return (
    <div>
      <Tooltip title="Editar">
        <IconButton aria-label="add" size="small" onClick={handleOpenEdit}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Abono">
        <IconButton
          aria-label="add"
          size="small"
          onClick={/*handleJustificationChange*/handleOpenJustification}
          disabled={!justification.need || loadingJustification}
          loading={loadingJustification}
        >
          <FreeCancellationIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <ModalEditTable
        open={openEdit}
        onClose={handleCloseEdit}
        day={day}
        workTime={workTime}
      />
      <ModalJustification 
        open={openJustification}
        onClose={handleCloseJustification}
        onJustify={handleJustificationChange}
        justification={justification}
      />
      <Snackbar 
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={justificationResponse.success ? justificationResponse.message === "Abono criado" ? "success" : "warning" : "error"}
          variant="filled"
        >
          {justificationResponse.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
