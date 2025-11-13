"use client"
import { Alert, Button } from "@mui/material";
import { useState, useTransition } from "react";
import { addPunchAction } from "@/actions/punch.action";
import PunchClockIcon from '@mui/icons-material/PunchClock';

type feedbackMessageType = {message: string | null, type: "error" | "success"}

export default function PunchButton({disabled}: {disabled: boolean}) {
	const [isPending, startTransition] = useTransition()
	const [feedbackMessage, setFeedbackMessage] = useState<feedbackMessageType>({message: null, type: "error"});

	const handleClick = () => {
		setFeedbackMessage({message: null, type: "error"})

		startTransition(async () => {
			const result = await addPunchAction()

			if (result.error) {
				setFeedbackMessage({message: result.error, type: "error"})
			} else {
				setFeedbackMessage({message: "Ponto registrando com sucesso!", type: "success"})
			}

		})
	}

	return (
		<div className="flex flex-col items-center gap-3">
			{feedbackMessage.message && (
				<Alert severity={feedbackMessage.type}>
					{feedbackMessage.message}
				</Alert>
			)}
			<Button 
				onClick={handleClick} 
				disabled={isPending || disabled} 
				variant="contained" 
				sx={{display: "flex", gap: "10px"}} 
			>
				<PunchClockIcon />
				{isPending ? 'Registrando...' : 'Bater ponto'}
			</Button>
		</div>
	)
}