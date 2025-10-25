import { Box, Typography, Container } from '@mui/material';
import Link from "next/link";

export default function Home() {
  return (
    <Box
      className="bg-[url('/hero.jpg')] bg-cover bg-center flex flex-col items-center justify-center gap-7 w-full "
    >
      <Container maxWidth="md">
        <Box className="text-center text-white p-16 rounded-lg flex flex-col gap-5" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            className="font-bold mb-4"
          >
            Controle de ponto 2000
          </Typography>
          <Typography 
            variant="h5" 
            component="p" 
            className="mb-8"
          >
            Faça o seu controle de ponto e horas extras muito mais fácil
          </Typography>
          <div className="flex gap-5 justify-center">
            <Link 
              href='/signin'
              className="bg-blue-500 p-3 rounded-md"
            >
              Começar Agora
            </Link>
            <Link 
              href="/login"
              className="bg-blue-500 p-3 rounded-md"
            >
              Já tenho conta
            </Link>
          </div>
        </Box>
      </Container>
    </Box>
  );
};
