import z from "zod";
import { addPunchesSchema } from "./punch.validation";
import { Punch } from "@prisma/client";
import { getDailySchedulesTime } from "../preferences/preferences.utils";

export type AddPunchDataType = z.infer<typeof addPunchesSchema>;

export type GroupedPunchesType = {
	date: string,
	timestamp: Date,
	dayOfWeek: {
		dayString: string,
		day: number
	},
	punches: Punch[],
}

export type PunchesPerDayType = {
	workedTime: {
		timeString: string;
		time: number;
	};
} & GroupedPunchesType

export type dailySchedulesTimeType = ReturnType<typeof getDailySchedulesTime>[number]