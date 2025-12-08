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
import TableHeadDesktop from "../../Desktop/TableHeadDesktop/TableHeadDesktop";
import TableHeadMobile from "../../Mobile/TableHeadMobile";
import TableModalEditRow from "../Desktop/TableModalEditRow/TableModalEditRow";
import { groupPunchesByDay } from "@/core/punch/punch.reports";
import TableModalEditRowMobile from "../Mobile/TableModalEditRowMobile/TableModalEditRowMobile";

type ModalEditTableProps = {
  open: boolean;
  onClose: () => void;
  day: Awaited<ReturnType<typeof groupPunchesByDay>>[number];
  workTime: number;
};

export default function ModalEditTable({
  open,
  onClose,
  day,
  workTime,
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
          maxWidth: isMobile ? 380 : 1000,
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
          size="small"
          sx={{ minWidth: isMobile ? 200 : 400 }}
          arial-label="tabela simples"
        >
          {isDesktop && <TableHeadDesktop isModal={true} />}
          {isMobile && <TableHeadMobile />}
          <TableBody>
            {isMobile ? (
              <TableModalEditRowMobile 
                day={day}
                workTime={workTime}
                onClose={onClose}
              />
            ) : (
              <TableModalEditRow
                day={day}
                workTime={workTime}
                onClose={onClose}
              />
            )}
            
          </TableBody>
        </Table>
      </TableContainer>
    </Modal>
  );
}
