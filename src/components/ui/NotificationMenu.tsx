"use client"; 
import React, { useState } from 'react';
import { 
  IconButton, 
  Badge, 
  Popover, 
  List, 
  ListItem, 
  ListItemText, 
  Typography,
  Box, 
  ListItemButton
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { updates } from '@/core/updates';

const notifications = updates

export default function NotificationMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;

  return (
    <div>
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
      >
        <Badge badgeContent={notifications.length} color='primary'>
          <NotificationsIcon/>
        </Badge>
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ width: '300px', padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Notificações
          </Typography>
          {notifications.length === 0 ? (
            <Typography variant="body2" >
              Nenhuma notificação nova.
            </Typography>
          ) : (
            <List dense>
              {notifications.map((notification) => (
                <ListItem key={notification.id} disablePadding>
					<ListItemButton onClick={handleClose}>
                  		<ListItemText primary={notification.title} />
				  	</ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Popover>
    </div>
  );
}