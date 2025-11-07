'use client'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useEffect, useState } from 'react';
import { Badge,IconButton, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material';
import { updates } from '@/core/updates';
import UpdateModal from '../modal/UpdateModal';


export default function Notifications() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [unseenUpdatesCount, setUnseenUpdatesCount] = useState(0)
	const [modalState, setModalState] = useState(false);
	const [hasSeen, setHasSeen] = useState(false)

	const open = Boolean(anchorEl)
	
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	
	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleOpenModal = () => setModalState(true);
	const handleCloseModal = () => setModalState(false);
	

	useEffect(() => {
		updates.forEach((update) => {
			const hasSeenUpdate = localStorage.getItem(update.id);

			if (!hasSeenUpdate) {
				setUnseenUpdatesCount(prev => prev + 1) 
			}
		})

		if (unseenUpdatesCount === 0) {
			setHasSeen(true);
		}

	}, [open, hasSeen]);

  return (
	<div>
	  	<Tooltip title="Notificações">
			<IconButton aria-label="info" onClick={handleClick}>
				<Badge badgeContent={!hasSeen && unseenUpdatesCount} color={hasSeen ? 'default' : 'primary'}>
					<NotificationsIcon/>
				</Badge>
			</IconButton>
	  	</Tooltip>
	  	<Menu
			anchorEl={anchorEl}
			open={open}
			onClose={handleClose}
		>
			{updates.map((update) => {
				return (
					<div key={update.id}>
						<MenuItem onClick={handleOpenModal} >
							<ListItemText>
								{update.title}
							</ListItemText>
						</MenuItem>
						<UpdateModal updateContent={update.content} modalState={modalState} handleClose={handleCloseModal}/>
					</div>
				)
			})}
		</Menu>
	</div>
  );
}