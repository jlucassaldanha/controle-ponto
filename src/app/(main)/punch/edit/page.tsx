import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

// Dados de exemplo
const timeSheetData = [
  { day: 'Segunda', entry: '08:00', lunchStart: '12:00', lunchEnd: '13:00', exit: '18:00' },
  { day: 'Terça', entry: '08:01', lunchStart: '12:05', lunchEnd: '13:02', exit: '18:03' },
  // ...outros dias
];

// Componente LabeledTableCell (definido acima ou importado)
const LabeledTableCell = ({ label, children }) => (
  <TableCell
    className="
       p-4 border-b dark:border-gray-700
      flex flex-col justify-between items-center text-right 
      md:table-cell md:text-center md:border-none
    "
  >
    <span className="font-bold text-left text-gray-700 dark:text-gray-300 md:hidden">
      {label}
    </span>
    <span>{children}</span>
  </TableCell>
);


export default function ResponsiveMuiTableNoCss() {
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Typography variant="h4" component="h1" className="mb-6 text-center">
        Folha de Ponto (100% Tailwind)
      </Typography>

      <TableContainer component={Paper}>
        <Table aria-label="Tabela de horários responsiva">
          {/* O cabeçalho continua igual, oculto em mobile */}
          <TableHead className="hidden md:table-header-group">
            <TableRow>
              <TableCell>Dia</TableCell>
              <TableCell align="center">Entrada</TableCell>
              <TableCell align="center">Saída</TableCell>
              <TableCell align="center">Início Almoço</TableCell>
              <TableCell align="center">Fim Almoço</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {timeSheetData.map((row) => (
              // A lógica da TableRow também permanece a mesma
              <TableRow
                key={row.day}
                className="
                  block mb-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md
                  md:table-row md:mb-0 md:shadow-none md:border-none
                "
              >
                {/* Célula do Dia - não precisa de rótulo */}
                <TableCell className="block p-4 border-b dark:border-gray-700 font-bold text-lg md:table-cell md:font-normal md:text-base md:border-none">
                  {row.day}
                </TableCell>
                
                {/* Usando o nosso novo componente! */}
                <LabeledTableCell label="Entrada:">{row.entry}</LabeledTableCell>
                <LabeledTableCell label="Saída:">{row.exit}</LabeledTableCell>
                <LabeledTableCell label="Início Almoço:">{row.lunchStart}</LabeledTableCell>
                <LabeledTableCell label="Fim Almoço:">{row.lunchEnd}</LabeledTableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}