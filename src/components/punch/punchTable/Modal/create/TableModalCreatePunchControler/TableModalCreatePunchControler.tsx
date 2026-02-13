"use client";

import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { groupPunchesByDay } from "@/core/punch/punch.reports";
import { IconButton, TableRow, Tooltip } from "@mui/material";
import ModalEditTable from "../../edit/ModalEditTable/ModalEditTable";
import FreeCancellationIcon from "@mui/icons-material/FreeCancellation";
import { fullDayJustificationAction } from "@/actions/justification.actions";
import { JustificationByDayType } from "@/core/justification/justification.types";
import ModalCreatePunchTable from "../ModalCreatePunchTable/ModalCreatePunchTable";

type TableModalControlerProps = {
  controlButton: React.ReactNode;
  open: boolean;
  onClose: () => void;
};

export default function TableModalCreatePunchControler({
  controlButton,
  open,
  onClose,
}: TableModalControlerProps) {
  return (
    <TableRow>
      {controlButton}
      <ModalCreatePunchTable
        open={open}
        onClose={onClose}
      />
    </TableRow>
  );
}
