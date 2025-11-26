import { minutesToTimeString } from "@/lib/dateUtils"

export function initialBalanceData(initialBalance: number) {
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