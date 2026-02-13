"use client"

import { Settings } from "@mui/icons-material"
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import { Avatar, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from "@mui/material"
import { logOutAction } from "@/actions/auth.action";
import { useState } from "react"
import { redirect } from "next/navigation";
import { ProfileProps } from "./types";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeMode } from "@/providers/ThemeProvider";

export default function Profile({ username }: ProfileProps) {
	const { toggleTheme, mode } = useThemeMode();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	
	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleRedirect = (url: string) => {
		setAnchorEl(null)
		redirect(url)
	}

	return (
		<div>
			<Tooltip title="Opções">
				<IconButton
					onClick={handleClick}
					size="small"
				>
					<Avatar>{username[0].toUpperCase()}</Avatar>
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem onClick={() => handleRedirect('/dashboard')}>
					<ListItemIcon>
						<DashboardIcon />
					</ListItemIcon>
					<ListItemText>
						Dashboard
					</ListItemText>
				</MenuItem>
				{/*<MenuItem onClick={() => handleRedirect('/punch/add')}>
					<ListItemIcon>
						<AddAlarmIcon />
					</ListItemIcon>
					<ListItemText>
						Adicionar pontos
					</ListItemText>
				</MenuItem>*/}
				<MenuItem onClick={() => handleRedirect('/punch/history')}>
					<ListItemIcon>
						<CalendarViewMonthIcon />
					</ListItemIcon>
					<ListItemText>
						Registro de pontos
					</ListItemText>
				</MenuItem>
				<Divider />
				<MenuItem onClick={() => handleRedirect('/preferences')}>
					<ListItemIcon>
						<Settings fontSize="small"/>
					</ListItemIcon>
					<ListItemText>
						Configurações
					</ListItemText>
				</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<DarkModeIcon fontSize="small"/>
					</ListItemIcon>
					<ListItemText onClick={toggleTheme}>
						Mudar tema
					</ListItemText>
				</MenuItem>
				<Divider />
				<MenuItem onClick={logOutAction}>
					<ListItemIcon>
						<LogoutIcon />
					</ListItemIcon>
					<ListItemText>
						Sair
					</ListItemText>
				</MenuItem>
			</Menu>
		</div>
	)
}