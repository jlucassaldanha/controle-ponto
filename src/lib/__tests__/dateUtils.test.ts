import { getADayInterval } from "../dateUtils"

describe('getADayInterval', () => {
    it('Should return a interval from day 00:00:00 to next day 00:00:00', () => {
        const date = new Date(Date.UTC(2025, 9, 19))

        const res = getADayInterval(date)

        expect(res).toStrictEqual({
            endOfDay: new Date("2025-10-20T00:00:00.000Z"),
            startOfDay: new Date("2025-10-19T00:00:00.000Z"),
        })
    })
})