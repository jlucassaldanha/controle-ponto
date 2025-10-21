import { getPunches } from "@/core/punch/punch.services"
import { formatPunch } from "@/lib/formatPunch"
import { requireUserSession } from "@/lib/session"

export const dynamic = 'force-dynamic'

export default async function Punch() {
	const session = await requireUserSession()
	const punches = await getPunches(session.id)



	return (
		<div className="flex flex-col items-center justify-center w-full gap-2">
			{punches.map((punch) => {
				const formatedPunch = formatPunch(punch)

				return (
					<div key={punch.id} className="flex flex-col gap-5">
						{formatedPunch.type} 
						{formatedPunch.date} 
						{formatedPunch.time} 
					</div>
				)
			})}
		</div>
	)
}