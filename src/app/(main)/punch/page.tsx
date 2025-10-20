import { getPunches } from "@/core/punch/punch.services"
import { requireUserSession } from "@/lib/session"

export const dynamic = 'force-dynamic'

export default async function Punch() {
	const session = await requireUserSession()
	const punches = await getPunches(session.id)

	return (
		<div className="flex flex-col items-center justify-center w-full gap-2">
			{punches.map((punch) => (
				<div key={punch.id} className="flex flex-col">
					{punch.type}
					<div>
						{punch.timestamp.getUTCDate()}/
						{punch.timestamp.getUTCMonth() + 1}/
						{punch.timestamp.getUTCFullYear()}
					</div>
					<div>
						{punch.timestamp.getUTCHours()}:
						{punch.timestamp.getUTCMinutes()}
					</div>
				</div>
			))}
		</div>
	)
}