import { getTotalOvertime } from "@/core/punch/punch.reports";
import { Card, CardContent, CardHeader, Divider } from "@mui/material";

export default function OvertimeCard({totalOvertime}: {totalOvertime: ReturnType<typeof getTotalOvertime>}) {
	
	const getOvertimeColor = () => {
		if (totalOvertime.overtime && !totalOvertime.undertime) {
			return "green"	
		} else if (!totalOvertime.overtime && totalOvertime.undertime) {
			return "red"
		}
	}

	const color = getOvertimeColor()

	return (		
		<Card>
			<CardHeader
				title="Horas Extras/Faltantes"
			/>
			<Divider />
			<CardContent>
				<p className={`text-${color}-500 flex items-center justify-center p-2`}>
					{totalOvertime.timeStr}	
				</p>
			</CardContent>
		</Card>
	)
}