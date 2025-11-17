import PunchButton from "@/components/punch/PunchButton/PunchButton";
import { getADayPunches } from "@/core/punch/punch.services";
import { PunchRegisterProps } from "./types";


export default async function PunchRegister({session}: PunchRegisterProps) {
	const aDayPunches = await getADayPunches(session.id, new Date())
	const isFull = aDayPunches.length === 4 

	return (
		<PunchButton disabled={isFull} />
	)
}