import { getADayInterval } from "@/lib/dateUtils"
import prismaMock from "../../../../test/setup"
import { PunchType } from "@prisma/client"
import { getADayPunches } from "../punch.services"

vi.mock("@/lib/dateUtils")

beforeEach(() => {
  vi.clearAllMocks();
});

describe("addPunch", () => {
    it('should add start punch if punches is empty', async () => {})
    it('should add end punch if has start punch', async () => {})
    it('should add start lunch punch if has end punch', async () => {})
    it('should add end lunch punch if has start lunch punch', async () => {})
})

describe('addPunches', () => {
    it('should add the punches into db', async () => {})
})

describe('getADayPunches', () => {
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
                timestamp: new Date('2025-10-19T09:00:00.000Z'),
                type: PunchType.CLOCK_IN, 
            },
            {
                id: 'punch_uuid_002',
                userId: 'clx_user_12345',
                timestamp: new Date('2025-10-19T12:00:00.000Z'),
                type: PunchType.START_LUNCH,
            },
            {
                id: 'punch_uuid_003',
                userId: 'clx_user_12345',
                timestamp: new Date('2025-10-19T13:00:00.000Z'),
                type: PunchType.END_LUNCH,
            },
            {
                id: 'punch_uuid_004',
                userId: 'clx_user_12345',
                timestamp: new Date('2025-10-19T18:00:00.000Z'),
                type: PunchType.CLOCK_OUT,
            },
        ]

        const searcDate = new Date(Date.UTC(2025, 9, 19))

        vi.mocked(getADayInterval).mockReturnValue(mockedDayInterval)

        prismaMock.punch.findMany.mockResolvedValue(mockedPunches)

        const res = await getADayPunches(userId, searcDate)

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

describe('getPunches', () => {
    it('should return all punches', async () => {})
})

describe('getFirstPunch', () => {
    it('should return only first punch', async () => {})
    it('should return null if dont have any punch', async () => {})
})