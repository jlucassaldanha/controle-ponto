'use client'
import Modal from '@mui/material/Modal';
import React, { useState } from 'react';
import {  Button, Card, CardActions } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function UpdateModal({updateContent, modalState, handleClose}: {updateContent?: React.ReactNode, modalState: boolean, handleClose: () => void}) {

  return (
    <div>
      <Modal
        open={modalState}
        aria-labelledby="update-info"
        aria-describedby="update-information"
      >
        <Card sx={style}>
            {updateContent}
          <CardActions>
            <Button variant='contained' onClick={handleClose}>
              Entendido
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
}