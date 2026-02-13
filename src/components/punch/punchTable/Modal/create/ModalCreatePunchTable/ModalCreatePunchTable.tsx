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
import TableHeadDesktop from "../../../Desktop/TableHeadDesktop/TableHeadDesktop";
import TableHeadMobile from "../../../Mobile/TableHeadMobile";
import TableModalCreateRowMobile from "../Mobile/TableModalCreateRowMobile/TableModalCreateRowMobile";
import TableModalCreateRow from "../Desktop/TableModalCreateRow/TableModalCreateRow";

type ModalEditTableProps = {
  open: boolean;
  onClose: () => void;
};

export default function ModalCreatePunchTable({
  open,
  onClose,
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
              <TableModalCreateRowMobile
                onClose={onClose}
              />
            ) : (
              <TableModalCreateRow
                onClose={onClose}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Modal>
  );
}
