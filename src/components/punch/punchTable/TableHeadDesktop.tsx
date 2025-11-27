import { TableCell, TableHead, TableRow } from "@mui/material";

export default function TableHeadDesktop() {
	return (
		<TableHead>
			<TableRow>
				<TableCell>Data</TableCell>
				<TableCell align="center">Entrada</TableCell>
				<TableCell align="center">Entrada almoço</TableCell>
				<TableCell align="center">Saída almoço</TableCell>
				<TableCell align="center">Saída</TableCell>
				<TableCell align="center">Total</TableCell>
				<TableCell align="center">Extras</TableCell>
				<TableCell align="center"></TableCell>
			</TableRow>
		</TableHead>
	)
}