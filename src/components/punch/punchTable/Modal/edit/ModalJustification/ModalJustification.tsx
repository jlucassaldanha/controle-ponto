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
import { JustificationByDayType } from "@/core/justification/justification.types";

type ModalJustificationProps = {
  open: boolean;
  onClose: () => void;
  onJustify: (message: string) => Promise<{ success: boolean; message: string; }>;
  justification: {
	  have: boolean;
	  need: boolean;
	  justification?: JustificationByDayType;
	};
};

export default function ModalJustification({
  open,
  onClose,
  onJustify,
  justification
}: ModalJustificationProps) {
  const theme = useTheme();
	
	const [message, setMessage] = React.useState<string>(justification.justification?.reason || "");
	const [loadingSave, setLoadingSave] = React.useState(false)
	const [loadingDelete, setLoadingDelete] = React.useState(false)

	const onDelete = async () => {
		setLoadingDelete(true)
		try {
			const result = await onJustify(message);
			if (result.success) {
			onClose();
			setMessage("");
			} else {
			console.log("Error", result.message);
			}
		} catch (error) {
			console.log(error);
		}
		setLoadingDelete(false)
	};

	const onCancel = () => {
		onClose();
		setMessage("");
	};
	
	const onSave = async () => {
		setLoadingSave(true)
		try {
			const result = await onJustify(message);
			if (result.success) {
			onClose();
			setMessage("");
			} else {
			console.log("Error", result.message);
			}
		} catch (error) {
			console.log(error);
		}
		setLoadingSave(false)
	};

	const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(event.target.value)
	} 

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
        <TextField sx={{ padding: 2 }} multiline rows={4} onChange={handleMessageChange} value={message}/>
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
            <IconButton 
				aria-label="delete" 
				onClick={onDelete}
		  		disabled={loadingDelete || (justification.need && !justification.have)}
              	loading={loadingDelete}
			>
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
