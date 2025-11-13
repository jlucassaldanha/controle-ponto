import { minutesToTimeString } from "@/lib/timeFormater"
import { getInitialBalance } from "./user.services"

export async function getInitialBalanceData(userId: string) {
	const initialBalance = await getInitialBalance(userId)

	if (initialBalance && initialBalance < 0) {
		return {
			isNegative: true,
			balanceString: minutesToTimeString(initialBalance * -1)
		}
	} else if (initialBalance && initialBalance > 0) {
		return {
			isNegative: false,
			balanceString: minutesToTimeString(initialBalance)
		}
	} else {
		return {
			isNegative: false,
			balanceString: "00:00"
		}
	}
}