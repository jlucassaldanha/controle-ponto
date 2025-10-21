import PreferencesForm from "@/components/preferences/PreferencesForm"
import { getUserPreferences } from "@/core/preferences/preferences.services"
import { groupSchedulesIntoRules } from "@/core/preferences/preferences.utils"
import { requireUserSession } from "@/lib/session"

export const dynamic = 'force-dynamic'

export default async function Preferences() {
	const user = await requireUserSession()	
	const userPreferences = await getUserPreferences(user.id)
	const dailySchedulesFromDb = userPreferences?.dailySchedules || []
	const initialSchedulesForForm = groupSchedulesIntoRules(dailySchedulesFromDb)

	return (
		<div className="flex flex-col items-center justify-center w-full gap-2">
			<PreferencesForm initialSchedules={initialSchedulesForForm} />			
		</div>
	)
}