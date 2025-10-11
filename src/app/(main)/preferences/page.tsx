import { auth } from "@/app/api/auth/[...nextauth]/route"
import PreferencesForm from "@/components/preferences/PreferencesForm"
import { getUserPreferences } from "@/core/preferences/preferences.services";
import { minutesToTimeString } from "@/lib/timeFormater";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'

const dayNumberToKeyMap: { [key: number]: string } = {
  0: 'sunday', 1: 'monday', 2: 'tuesday', 3: 'wednesday',
  4: 'thursday', 5: 'friday', 6: 'saturday',
}

export default async function Preferences() {
	const session = await auth();
	
	  if (!session?.user?.id) {
		return redirect("/login");
	  }
	
	  const userId = session.user.id;
	
	  const userPreferences = await getUserPreferences(userId)

	  const dailySchedulesFromDb = userPreferences?.dailySchedules || []

  	  const scheduleRulesMap = new Map<string, any>();
	  

	  for (const schedule of dailySchedulesFromDb) {
		const timeKey = `${schedule.entryTime}-${schedule.exitTime}-${schedule.lunchStartTime}-${schedule.lunchEndTime}`;

		if (!scheduleRulesMap.has(timeKey)) {
			scheduleRulesMap.set(timeKey, {
				id: timeKey,
				entryTime: minutesToTimeString(schedule.entryTime),
				exitTime: minutesToTimeString(schedule.exitTime),
				lunchStartTime: minutesToTimeString(schedule.lunchStartTime),
				lunchEndTime: minutesToTimeString(schedule.lunchEndTime),
				days: { 
					sunday: false, 
					monday: false, 
					tuesday: false, 
					wednesday: false, 
					thursday: false, 
					friday: false, 
					saturday: false 
				},
			});
		}

		const dayKey = dayNumberToKeyMap[schedule.dayOfWeek];
		if (dayKey) {
			scheduleRulesMap.get(timeKey).days[dayKey] = true;
		}
	}

	const initialSchedulesForForm = Array.from(scheduleRulesMap.values());

	return (
		<div className="flex flex-col items-center justify-center w-full gap-2">
			<PreferencesForm initialSchedules={initialSchedulesForForm} />			
		</div>
	)
}