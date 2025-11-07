import PunchButton from "@/components/punch/PunchButton/PunchButton";
import { getADayPunches } from "@/core/punch/punch.services";

type sessionType = {
    id: string;
    username: string;
    email: string;
}
export default async function PunchRegister({session}:{session: sessionType}) {
	const aDayPunches = await getADayPunches(session.id, new Date())
	const isFull = aDayPunches.length === 4 

	return (
		<PunchButton disabled={isFull} />
	)
}