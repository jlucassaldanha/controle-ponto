import { formatDate } from "@/lib/dateUtils";
import { getJustifications } from "./justification.services";

interface JustificationByDayType {
	date: Date,
	timeMinutes: number,
	reason: string
}

export async function getJustificationsReport(userId: string, initialDate: Date, finalDate: Date) {
	const justifications = await getJustifications(userId)

	const justificationsMap = new Map<string, JustificationByDayType>(
		justifications.map(justification => {
			return [
				formatDate(justification.date), 
				{
					date: justification.date,
					timeMinutes: justification.minutes,
					reason: justification.reason,
				}
			] 
		})
	)

	const reportList: JustificationByDayType[] = []
	const currentDate = new Date(initialDate)

	while (currentDate <= finalDate) {
		const currentDateString = formatDate(currentDate)
		const justification = justificationsMap.get(currentDateString)
		
		reportList.push({
			date: currentDate,
			timeMinutes: justification?.timeMinutes || 0,
			reason: justification?.reason || "No justification"
		})
		currentDate.setDate(currentDate.getDate() + 1)
	}

	return reportList
}