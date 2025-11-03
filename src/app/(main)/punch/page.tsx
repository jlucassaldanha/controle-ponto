import PunchButton from "@/components/punch/PunchButton/PunchButton";
import { getADayPunches } from "@/core/punch/punch.services";
import { requireUserSession } from "@/lib/session";

export default async function Punch() {
	const session = await requireUserSession()
	const aDayPunches = await getADayPunches(session.id, new Date())
	const isFull = aDayPunches.length === 4 

	return (
		<div className="flex flex-col items-center justify-center w-full gap-5 m-5">
			<PunchButton disabled={isFull} />
		</div>
	)
}