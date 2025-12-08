import { TableCell, TableHead, TableRow } from "@mui/material";

export default function TableHeadMobile() {
	return (
		<TableHead>
			<TableRow>
				<TableCell>Data</TableCell>
				<TableCell align="center" padding="none">Entrada</TableCell>
				<TableCell align="center" padding="none">Saída</TableCell>
				<TableCell align="center" padding="none">Total</TableCell>
				<TableCell align="center" padding="none">Extras</TableCell>
				<TableCell align="center" padding="none"></TableCell>
			</TableRow>
		</TableHead>
	)
}