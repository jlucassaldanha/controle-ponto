import prismaMock from "../../../test/setup";
import { getUserPreferences } from "./preferences.services";

beforeEach(() => {
  vi.clearAllMocks();
});

describe('getUserPreferences', () => {
	const userId = 'user-uuid'
	const mockedUserPreferences = {
		id: 'config-uuid',
   		userId: userId,
		dailySchedules: [{
				id: 'schedule-uuid',
				dayOfWeek: 1,
				entryTime: 100,
				exitTime: 200,
				lunchStartTime: 110,
				lunchEndTime: 120,
				configId: 'config-uuid',
			}
		]
	}
	it('should return userPreferences if it exists', async () => {
		prismaMock.config.findUnique.mockResolvedValue(mockedUserPreferences)	
		
		const res = await getUserPreferences(userId)

		expect(res).toStrictEqual(mockedUserPreferences)
		expect(prismaMock.config.findUnique).toHaveBeenCalledWith({ 
			where: { userId: userId },
			include: { dailySchedules: true } 
		})
	})

	it('should return null if have no userPreferences', async () => {
		prismaMock.config.findUnique.mockResolvedValue(null)
		
		const res = await getUserPreferences(userId)

		expect(res).toBeNull()
		expect(prismaMock.config.findUnique).toHaveBeenCalledWith({ 
			where: { userId: userId },
			include: { dailySchedules: true } 
		})
	})
})