import { Button, TableCell, TableRow, Tooltip } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function CreatePunchRow() {
	const action = () => (console.log("ação do botão de adição"))
	return (
		<TableRow >
			<TableCell colSpan={8}>
				<Tooltip title="Adicionar registro">
					<Button 
						size="small" 
						color="inherit" 
						startIcon={<AddBoxIcon fontSize="small" />} 
						fullWidth
						sx={{display: "flex", justifyContent: "start"}}
						action={action}
					>
						Adicionar registro
					</Button>
				</Tooltip>
			</TableCell>
		</TableRow>
	)
}