"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ModalTable from "../ModalTable/ModalTable";

export default function PunchModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button aria-label="add" onClick={handleOpen}>
        <AddBoxIcon />
      </Button>
      <ModalTable open={open} onClose={handleClose} />
    </div>
  );
}
