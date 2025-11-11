import { getTotalOvertime } from "@/core/punch/punch.reports";
import { Card, CardContent, CardHeader, Divider } from "@mui/material";

export default function OvertimeCard({totalOvertime}: {totalOvertime: ReturnType<typeof getTotalOvertime>}) {

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