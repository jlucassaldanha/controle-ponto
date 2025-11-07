'use client'
import NotificationsIcon from '@mui/icons-material/Notifications';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { Badge, Button, Card, CardActions, CardContent, IconButton, Tooltip } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function UpdateModal() {
  const [hasSeen, setHasSeen] = useState(false)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    localStorage.setItem(UPDATE_ID, 'true');
    setOpen(false)
  };

  const UPDATE_ID = 'v_correcao_dias_e_botao';

  useEffect(() => {
    const hasSeenUpdate = localStorage.getItem(UPDATE_ID);

    if (hasSeenUpdate) {
      setHasSeen(true);
    }

  }, [open]);

  return (
    <div>
      <Tooltip title="Notificações">
        <IconButton aria-label="info" onClick={handleOpen}>
          <Badge badgeContent={!hasSeen && 1} color={hasSeen ? 'default' : 'primary'}>
            <NotificationsIcon/>
          </Badge>
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        aria-labelledby="update-info"
        aria-describedby="update-information"
      >
        <Card sx={style}>
          <CardContent>
            <Typography id="update-info" variant="h6" component="h2">
              🚀 <strong>Atualizações!</strong>
            </Typography>
            <Typography sx={{margin: "10px"}}>
              Olá! Há novidades e correções por aqui:
            </Typography>
            <Typography sx={{margin: "20px"}}>
              ✨ <strong>Novo Recurso:</strong> Agora você pode <strong>Bater o Ponto</strong> usando o novo botão de acesso rápido na tela inicial.
            </Typography>
            <Typography sx={{margin: "20px"}}>
              🐞 <strong>Correção:</strong> Ajustamos o cálculo de relatórios. O sistema agora contabiliza corretamente os dias faltados que não eram exibidos antes.
            </Typography>
          </CardContent>
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