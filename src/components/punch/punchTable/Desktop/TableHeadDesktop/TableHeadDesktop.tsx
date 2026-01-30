import { TableCell, TableHead, TableRow } from "@mui/material";
//import PunchModal from "../PunchModal/PunchModal";

export default function TableHeadDesktop({ isModal }: { isModal: boolean }) {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Data</TableCell>
        <TableCell align="center">Entrada</TableCell>
        <TableCell align="center">Entrada almoço</TableCell>
        <TableCell align="center">Saída almoço</TableCell>
        <TableCell align="center">Saída</TableCell>
        <TableCell align="center">Total</TableCell>
        <TableCell align="center">Saldo</TableCell>
        <TableCell align="center">{!isModal && "" /*<PunchModal />*/}</TableCell>
      </TableRow>
    </TableHead>
  );
}
