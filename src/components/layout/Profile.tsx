"use client"
import { Settings } from "@mui/icons-material"
import { Avatar, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from "@mui/material"
import { logOutAction } from "@/actions/auth.action";
import { useState } from "react"
import { redirect } from "next/navigation";

export default function Profile({ username }: {username: string}) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	
	const handleClose = () => {
		setAnchorEl(null)
	}

	const handlePreferencesRedirect = () => {
		setAnchorEl(null)
		redirect('/preferences')
	}

	const handlePunchRedirect = () => {
		setAnchorEl(null)
		redirect('/punch')
	}

	const handlePunchesRedirect = () => {
		setAnchorEl(null)
		redirect('/punch/add')
	}

	const handleViewPunchesRedirect = () => {
		setAnchorEl(null)
		redirect('/punch/history')
	}

	return (
		<div>
			<div>
				<Tooltip title="Opções">
					<IconButton
						onClick={handleClick}
						size="small"
					>
						<Avatar>{username[0].toUpperCase()}</Avatar>
					</IconButton>
				</Tooltip>
			</div>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem onClick={handlePunchRedirect}>
					<ListItemText>
						Bater ponto
					</ListItemText>
				</MenuItem>
				<MenuItem onClick={handlePunchesRedirect}>
					<ListItemText>
						Adicionar pontos
					</ListItemText>
				</MenuItem>
				<MenuItem onClick={handleViewPunchesRedirect}>
					<ListItemText>
						Visualizar pontos
					</ListItemText>
				</MenuItem>
				<Divider />
				<MenuItem onClick={handlePreferencesRedirect}>
					<ListItemIcon>
						<Settings fontSize="small"/>
					</ListItemIcon>
					<ListItemText>
						Configurações
					</ListItemText>
				</MenuItem>
				<Divider />
				<MenuItem onClick={logOutAction}>
					<ListItemText>
						Sair
					</ListItemText>
				</MenuItem>
			</Menu>
		</div>
	)
}