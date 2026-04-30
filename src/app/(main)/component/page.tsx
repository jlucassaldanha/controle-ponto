"use client";

import { Box, IconButton, Modal, TextField, Tooltip } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";


export default function component() {
  const onCancel = () => {
    return null;
  };
  const onSave = () => {
    return null;
  };
  const onDelete = () => {
    return null;
  };
  const loadingSave = false;

  return (
    <div className="flex flex-col items-center justify-center w-full gap-5">
      <Modal
	  sx={{ margin: "7px" }}
	  open={true}
	  aria-labelledby="modal-modal-title"
	  aria-describedby="modal-modal-description"
	>
	  <Box
	  sx={{
          maxHeight: 400,
          maxWidth: false ? 380 : 800,
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
    </div>
  );
}
