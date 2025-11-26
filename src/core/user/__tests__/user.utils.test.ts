import { minutesToTimeString } from "@/lib/dateUtils"
import { initialBalanceData } from "../user.utils"

vi.mock("@/lib/dateUtils")

beforeEach(() => {
  vi.clearAllMocks();
});

describe('initialBalanceData', () => {
  it('should should return isNegative false and balance string if balance is greater than 0', async () => {
    const balance = 60

    const balanceData = {
			isNegative: false,
			balanceString: "01:00"
		}

    vi.mocked(minutesToTimeString).mockReturnValue("01:00")

    const result = initialBalanceData(balance)

    expect(result).toStrictEqual(balanceData)
    expect(minutesToTimeString).toHaveBeenCalledWith(balance)
  })

  it('should should return isNegative true and balance string if balance is 0', async () => {
    const balance = 0

    const balanceData = {
			isNegative: false,
			balanceString: "00:00"
		}

    vi.mocked(minutesToTimeString).mockReturnValue("00:00")

    const result = initialBalanceData(balance)

    expect(result).toStrictEqual(balanceData)
  })

  it('should should return isNegative false and balance string if balance is lower than 0', async () => {
    const balance = -60

    const balanceData = {
			isNegative: true,
			balanceString: "01:00"
		}

    vi.mocked(minutesToTimeString).mockReturnValue("01:00")

    const result = initialBalanceData(balance)

    expect(result).toStrictEqual(balanceData)
    expect(minutesToTimeString).toHaveBeenCalledWith(balance * -1)
  })
})