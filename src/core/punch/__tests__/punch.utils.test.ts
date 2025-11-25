describe('formatPunchDateTime', () => {
	it('should return object with the date, day of week and time in string format', () => {})
})

describe('getPunchTimestampMinutes', () => {
	it("should return punch time in minutes of choice's type", () => {})
	it("should return 0 if punch not found", () => {})
})

describe('getPunchTime', () => {
	it("should return punch time in string format of choice's type", () => {})
	it("should return undefined if punch not found", () => {})
})

describe('isUnderOver', () => {
	it('should return overtime: false, undertime: true and time if time is lower than 0', () => {})
	it('should return overtime: true, undertime: false and time if time is greater than 0', () => {})
	it('should return overtime: false, undertime: false and time if time is not lower and not greater than 0', () => {})
})