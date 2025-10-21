import { type Punch, PunchType } from "@prisma/client";

const PunchTypeToKeyMap: { [key: string]: string } = {
  [PunchType.CLOCK_IN] : 'Entrada', 
  [PunchType.CLOCK_OUT] : 'Saída',
  [PunchType.START_LUNCH] : 'Entrada Almoço',
  [PunchType.END_LUNCH] : 'Entrada Almoço',
}

export function formatPunch(punch: Punch) {
	const day = punch.timestamp.getUTCDate().toString().padStart(2, '0')
	const month = punch.timestamp.getUTCMonth().toString().padStart(2, '0')
	const year = punch.timestamp.getUTCFullYear()
	const date = `${day}/${month}/${year}`

	const hours = punch.timestamp.getUTCHours().toString().padStart(2, '0')
	const minutes = punch.timestamp.getUTCMinutes().toString().padStart(2, '0')
	const time = `${hours}:${minutes}`

	return {
		type: PunchTypeToKeyMap[punch.type],
		date,
		time,
	}
}