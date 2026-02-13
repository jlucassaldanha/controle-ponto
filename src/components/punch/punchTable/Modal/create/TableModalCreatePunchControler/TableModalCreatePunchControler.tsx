"use client";

import * as React from "react";
import { TableRow } from "@mui/material";
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
