import { auth } from "@/app/api/auth/[...nextauth]/route"
import PreferencesForm from "@/components/preferences/PreferencesForm"
import { getUserPreferences } from "@/core/preferences/preferences.services";
import { minutesToTimeString } from "@/lib/timeFormater";
import { redirect } from "next/navigation";


export const dynamic = 'force-dynamic'

export default async function Preferences() {
	const session = await auth();
	
	  if (!session?.user?.id) {
		return redirect("/login");
	  }
	
	  const userId = session.user.id;
	
	  const userPreferences = await getUserPreferences(userId)

	  const initialSchedules = userPreferences?.dailySchedules.map(schedule => {
		return {
			id: Date.now().toString(),
			entryTime: minutesToTimeString(schedule.entryTime),
			exitTime: minutesToTimeString(schedule.exitTime),
			lunchStartTime: minutesToTimeString(schedule.lunchStartTime),
			lunchEndTime: minutesToTimeString(schedule.lunchEndTime),
			days: {
				sunday: schedule.dayOfWeek === 0,
				monday: schedule.dayOfWeek === 1,
				tuesday: schedule.dayOfWeek === 2,
				wednesday: schedule.dayOfWeek === 3,
				thursday: schedule.dayOfWeek === 4,
				friday: schedule.dayOfWeek === 5,
				saturday: schedule.dayOfWeek === 6,
			}
		}
	  }) || []

	return (
		<div className="flex flex-col items-center justify-center w-full gap-2">
			<PreferencesForm initialSchedules={initialSchedules} />			
		</div>
	)
}