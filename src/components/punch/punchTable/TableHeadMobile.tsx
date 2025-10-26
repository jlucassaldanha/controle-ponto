import { TableCell, TableHead, TableRow } from "@mui/material";

export default function TableHeadMobile() {
	return (
		<TableHead>
			<TableRow>
				<TableCell>Data</TableCell>
				<TableCell sx={{display: "flex", justifyContent: "space-between", gap: "10px"}} >
					<span>Entrada</span>
					<span>Saída</span>
				</TableCell>
				<TableCell align="center">Total</TableCell>
				<TableCell align="center">Extras</TableCell>
			</TableRow>
		</TableHead>
	)
}