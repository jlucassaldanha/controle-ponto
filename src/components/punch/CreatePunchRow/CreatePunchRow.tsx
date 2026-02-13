import { Button, ButtonBaseActions, TableCell, TableRow, Tooltip } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Ref } from "react";

export default function CreatePunchRow({onClick}: {onClick: () => void}) {
	return (
		
			<TableCell colSpan={8}>
				<Tooltip title="Adicionar registro">
					<Button 
						size="small" 
						color="inherit" 
						startIcon={<AddBoxIcon fontSize="small" />} 
						fullWidth
						sx={{display: "flex", justifyContent: "start"}}
						onClick={onClick}
					>
						Adicionar registro
					</Button>
				</Tooltip>
			</TableCell>
		
	)
}