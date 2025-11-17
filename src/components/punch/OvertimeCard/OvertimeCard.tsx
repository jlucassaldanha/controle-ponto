import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import { OverTimeCardProps } from "./types";

export default function OvertimeCard({totalOvertime}: OverTimeCardProps) {
	return (		
		<Card>
			<CardHeader
				title="Horas Extras/Faltantes"
			/>
			<Divider />
			<CardContent>
				<p className={`${totalOvertime.overtime ? "text-green-500" : "text-red-500"} " flex items-center justify-center p-2`}>
					{totalOvertime.timeStr}	
				</p>
			</CardContent>
		</Card>
	)
}