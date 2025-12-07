"use client";

import * as React from "react";
import Modal from "@mui/material/Modal";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TableHeadDesktop from "../../TableHeadDesktop/TableHeadDesktop";
import TableHeadMobile from "../../../Mobile/TableHeadMobile";
import TableModalEditRow from "../TableModalEditRow";
import { groupPunchesByDay } from "@/core/punch/punch.reports";

type ModalEditTableProps = {
  open: boolean;
  onClose: () => void;
  day: Awaited<ReturnType<typeof groupPunchesByDay>>[number]
  workTime: number
}

export default function ModalEditTable({
  open,
  onClose,
  day,
  workTime
}: ModalEditTableProps) {
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 400,
          maxWidth: isMobile ? 600 : 1000,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
        }}
      >
        <Table
          stickyHeader
          sx={{ minWidth: isMobile ? 200 : 400 }}
          arial-label="tabela simples"
        >
          {isDesktop && <TableHeadDesktop isModal={true} />}
          {isMobile && <TableHeadMobile />}
          <TableBody>
            <TableModalEditRow day={day} workTime={workTime} onClose={onClose} />
          </TableBody>
        </Table>
      </TableContainer>
    </Modal>
  );
}
