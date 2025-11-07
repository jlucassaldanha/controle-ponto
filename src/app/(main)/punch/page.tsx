import PunchRegister from "@/components/punch/PunchRegister";
import { requireUserSession } from "@/lib/session";

export default async function Punch() {
	const session = await requireUserSession()

	return (
		<div className="flex flex-col items-center justify-center w-full gap-5 m-5">
			<PunchRegister session={session}/>
		</div>
	)
}