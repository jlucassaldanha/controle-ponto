import { Card, CardContent, CardHeader, Divider } from "@mui/material";

export default function OvertimeCard({time, color}: {time: string, color: string}) {
	return (		
		<Card>
			<CardHeader
				title="Horas Extras/Faltantes"
			/>
			<Divider />
			<CardContent>
				<p className={"text-" + color + "-500 flex items-center justify-center p-2"}>
					{time}	
				</p>
			</CardContent>
		</Card>
	)
}