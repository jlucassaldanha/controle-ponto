import { getADayInterval } from "@/lib/dateUtils"
import prismaMock from "../../../test/setup"
import { PunchType } from "@prisma/client"
import { searchForPunches } from "./punch.services"

vi.mock("@/lib/dateUtils")

describe('searchForPunches', () => {
    it('should return a list of punches for that day', async () => {
        const userId = "user-uuid"

        const mockedDayInterval = {
            endOfDay: new Date("2025-10-20T00:00:00.000Z"),
            startOfDay: new Date("2025-10-19T00:00:00.000Z"),
        }   
        
        const mockedPunches = [
            {
                id: 'punch_uuid_001',
                userId: 'clx_user_12345',
                // Entrada da jornada às 09:00
                timestamp: new Date('2025-10-19T09:00:00.000Z'),
                type: PunchType.CLOCK_IN, 
            },
            {
                id: 'punch_uuid_002',
                userId: 'clx_user_12345',
                // Saída para o almoço às 12:00
                timestamp: new Date('2025-10-19T12:00:00.000Z'),
                type: PunchType.START_LUNCH,
            },
            {
                id: 'punch_uuid_003',
                userId: 'clx_user_12345',
                // Volta do almoço às 13:00
                timestamp: new Date('2025-10-19T13:00:00.000Z'),
                type: PunchType.END_LUNCH,
            },
            {
                id: 'punch_uuid_004',
                userId: 'clx_user_12345',
                // Fim da jornada às 18:00
                timestamp: new Date('2025-10-19T18:00:00.000Z'),
                type: PunchType.CLOCK_OUT,
            },
        ]

        const searcDate = new Date(Date.UTC(2025, 9, 19))

        vi.mocked(getADayInterval).mockReturnValue(mockedDayInterval)

        prismaMock.punch.findMany.mockResolvedValue(mockedPunches)

        const res = await searchForPunches(userId, searcDate)

        expect(res).toStrictEqual(mockedPunches)
        expect(getADayInterval).toBeCalledWith(searcDate)
        expect(prismaMock.punch.findMany).toBeCalledWith({
            where: {
                userId: userId,
                timestamp: {
                    gte: mockedDayInterval.startOfDay,
                    lt: mockedDayInterval.endOfDay,
                },
            },
            orderBy: {
                timestamp: 'asc',
            },
        })
    })
})