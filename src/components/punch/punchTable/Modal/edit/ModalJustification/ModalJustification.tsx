"use client";

import * as React from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  IconButton,
  TextField,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { groupPunchesByDay } from "@/core/punch/punch.reports";
import { useEditRow } from "@/hooks/useEditRow";

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

  const {
	  workedTime,
	  overUnder,
	  color,
	  clockIn,
	  clockOut,
	  startLunch,
	  endLunch,
	  loadingSave,
	  getDisplayTime,
	  onCancel,
	  onSave,
	  handlePunchChange,
	} = useEditRow(day, workTime, onClose);
	const onDelete = () => {
    return null;
  };

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
	  <Box
	  sx={{
          maxHeight: 400,
          maxWidth: isMobile ? 380 : 800,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
		  borderRadius: 2,
        }}
      >
        <TextField sx={{ padding: 2 }} multiline rows={4} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: 1,
            alignItems: "center",
            gap: 6,
          }}
        >
          <Tooltip title="Cancelar">
            <IconButton aria-label="cancel" color="error" onClick={onCancel}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Deletar">
            <IconButton aria-label="delete" onClick={onDelete}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Salvar">
            <IconButton
              type="submit"
              aria-label="save"
              onClick={onSave}
              disabled={loadingSave}
              loading={loadingSave}
            >
              <SaveIcon fontSize="small" color="primary" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
	</Modal>
  );
}
