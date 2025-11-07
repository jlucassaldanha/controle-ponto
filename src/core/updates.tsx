import { CardContent, Typography } from "@mui/material";

export const updates = [{
	id: "v_correcao_dias_e_botao",
	title: "Novos recursos!",
	content: (
		<CardContent>
			<Typography id="update-info" variant="h6" component="h2">
              	🚀 <strong>Atualizações!</strong>
            </Typography>
            <Typography sx={{margin: "10px"}}>
              	Olá! Há novidades e correções por aqui:
            </Typography>
            <Typography sx={{margin: "20px"}}>
              	✨ <strong>Novo Recurso:</strong> Agora você pode <strong>Bater o Ponto</strong> usando o novo botão de acesso rápido na tela inicial.
            </Typography>
            <Typography sx={{margin: "20px"}}>
              	🐞 <strong>Correção:</strong> Ajustamos o cálculo de relatórios. O sistema agora contabiliza corretamente os dias faltados que não eram exibidos antes.
            </Typography>
		</CardContent>
	)
},
{
	id: "v_mudancas_interface_header",
	title: "Mudanças na interface!",
	content: (
		<CardContent>
			<Typography id="update-info" variant="h6" component="h2">
              	🚀 <strong>Atualizações!</strong>
            </Typography>
            <Typography sx={{margin: "10px"}}>
              	Olá! Há novidades de interface por aqui:
            </Typography>
            <Typography sx={{margin: "20px"}}>
              	✨ <strong>Novo Recurso:</strong> Agora você pode <strong>Bater o Ponto</strong> usando o novo botão de acesso rápido na tela inicial.
            </Typography>
            <Typography sx={{margin: "20px"}}>
              	🐞 <strong>Correção:</strong> Ajustamos o cálculo de relatórios. O sistema agora contabiliza corretamente os dias faltados que não eram exibidos antes.
            </Typography>
		</CardContent>
	)
},

] 