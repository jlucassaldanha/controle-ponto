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
import { groupPunchesByDay } from "@/core/punch/punch.reports";
import TableModalEditRowMobile from "../Mobile/TableModalEditRowMobile/TableModalEditRowMobile";
import TableModalEditRow from "../Desktop/TableModalEditRow/TableModalEditRow";
import { JustificationByDayType } from "@/core/justification/justification.types";

type ModalEditTableProps = {
  open: boolean;
  onClose: () => void;
  day: Awaited<ReturnType<typeof groupPunchesByDay>>[number];
  workTime: number;
  justifications: JustificationByDayType[];
};

export default function ModalEditTable({
  open,
  onClose,
  day,
  workTime,
  justifications,
}: ModalEditTableProps) {
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Modal
      sx={{ margin: "7px" }}
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 400,
          maxWidth: isMobile ? 380 : 800,
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
                justifications={justifications}
              />
            ) : (
              <TableModalEditRow
                day={day}
                workTime={workTime}
                onClose={onClose}
                justifications={justifications}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Modal>
  );
}
