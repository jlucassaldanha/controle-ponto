import { type Punch, PunchType } from "@prisma/client";

const PunchTypeToKeyMap: { [key: string]: string } = {
  [PunchType.CLOCK_IN] : 'Entrada', 
  [PunchType.CLOCK_OUT] : 'Saída',
  [PunchType.START_LUNCH] : 'Entrada Almoço',
  [PunchType.END_LUNCH] : 'Entrada Almoço',
}

const dayNumberToKeyMap: { [key: number]: string } = {
  0: 'Dom', 
  1: 'Seg', 
  2: 'Ter', 
  3: 'Qua',
  4: 'Qui', 
  5: 'Sex', 
  6: 'Sáb',
}

export function formatPunchInfo(punch: Punch) {
	const type = PunchTypeToKeyMap[punch.type]

	const day = punch.timestamp.getUTCDate().toString().padStart(2, '0')
	const month = (punch.timestamp.getUTCMonth() + 1).toString().padStart(2, '0')
	const year = punch.timestamp.getUTCFullYear()
	const date = `${day}/${month}/${year}`

	const hours = punch.timestamp.getUTCHours().toString().padStart(2, '0')
	const minutes = punch.timestamp.getUTCMinutes().toString().padStart(2, '0')
	const time = `${hours}:${minutes}`

	const dayOfWeek = dayNumberToKeyMap[punch.timestamp.getUTCDay()]

	return { type, date, dayOfWeek, time, }
}