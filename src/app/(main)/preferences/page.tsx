import InitialBalanceTimeCard from "@/components/preferences/InitialBalanceTimeCard"
import PreferencesForm from "@/components/preferences/PreferencesForm"
import { getUserPreferences } from "@/core/preferences/preferences.services"
import { groupSchedulesIntoRules } from "@/core/preferences/preferences.utils"
import { getInitialBalanceData } from "@/core/user/user.utils"
import { requireUserSession } from "@/lib/session"

export const dynamic = 'force-dynamic'

export default async function Preferences() {
	const user = await requireUserSession()	
	const userPreferences = await getUserPreferences(user.id)
	const dailySchedulesFromDb = userPreferences?.dailySchedules || []
	const initialSchedulesForForm = groupSchedulesIntoRules(dailySchedulesFromDb)

	const initialBalance = await getInitialBalanceData(user.id)
	
	return (
		<div className="flex flex-col items-center justify-center w-full gap-2 m-5">
			<div className='w-full p-6'>
				<InitialBalanceTimeCard initialBalance={initialBalance.balanceString} isNegative={initialBalance.isNegative}/>
			</div>
			<PreferencesForm initialSchedules={initialSchedulesForForm} />			
		</div>
	)
}