import { Box, Typography, Container } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from "next/link";

export default function Home() {
  return (
    <Box
      className="bg-[url('/hero.jpg')] bg-cover bg-center flex flex-col items-center justify-center gap-7 w-full "
    >
      <Container maxWidth="md">
        <Box className="text-center text-white p-16 rounded-lg flex flex-col gap-5" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            className="font-bold mb-4"
          >
            Controle de ponto
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
      <Container maxWidth="md">
        <Box className="text-center text-white p-16 rounded-lg flex flex-col gap-5" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <Typography 
            variant="h4" 
            component="h2" 
            className="font-bold mb-4"
          >
            Aviso!
          </Typography>
          <Typography 
            variant="h6" 
            component="p" 
            className="mb-8"
          >
            Este projeto ainda está em desenvolvimento, qualquer dúvida, sugestão, ou relato de bug, entre em contato com o desenvolvedor.
          </Typography>
          <div className="flex gap-5 justify-center">
            <Link 
              href='/signin'
              className='flex gap-2 justify-center items-center'
            >
              <LinkedInIcon/>
              Linkedin
            </Link>
            <Link 
              href="/login"
              className='flex gap-2 justify-center items-center'
            >
              <GitHubIcon/>
              GitHub
            </Link>
          </div>
        </Box>
      </Container>
    </Box>
  );
};
