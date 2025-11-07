"use client"
import { Settings } from "@mui/icons-material"
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material"
import { useState } from "react"

export default function Profile({ username }: {username: string}) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	
	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<div>
			<div>
				<Tooltip title="Opções">
					<IconButton
						onClick={handleClick}
						size="small"
					>
						<Avatar>{username[0]}</Avatar>
					</IconButton>
				</Tooltip>
			</div>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem>
					<ListItemIcon>
						<Settings fontSize="small"/>
					</ListItemIcon>
				</MenuItem>
			</Menu>
		</div>
	)
}