import z from "zod"
import { updateUserPreferencesSchema } from "./preferences.validation"

export type ConfigDataType = {
	entryTime: number,
	exitTime: number,
	lunchStartTime: number,
	lunchEndTime: number,
}

export type dailySchedulesType = {
	id: string;
	dayOfWeek: number;
	configId: string;
} & ConfigDataType

export type SchedulesRulesType = {
	id: string
	entryTime: string
	exitTime: string
	lunchStartTime: string
	lunchEndTime: string
	days: {
		sunday: boolean
		monday: boolean
		tuesday: boolean
		wednesday: boolean
		thursday: boolean
		friday: boolean
		saturday: boolean
	}
}

export type DayKey = keyof SchedulesRulesType['days']

export type TimeFieldKey = 'entryTime' | 'exitTime' | 'lunchStartTime' | 'lunchEndTime'

export type PreferencesFormProps = {
  initialSchedules: SchedulesRulesType[];
}

export type handleTimeChangeType = (ruleId: string, field: TimeFieldKey, value: string) => void

export type ScheduleRuleItemProps = {
  rule: SchedulesRulesType
  handleDayChange: (ruleId: string, dayKey: DayKey, isChecked: boolean) => void
  handleTimeChange: handleTimeChangeType
  handleRemove: (id: string) => void
}

export type JourneyCardProps = { 
	rule: SchedulesRulesType, 
	variant: {
		title: "Jornada" | "Almoço",
		entryField: TimeFieldKey,
		exitField: TimeFieldKey,
	} 
	handleTimeChange: handleTimeChangeType 
}

export type UpdateConfigDataType = z.infer<typeof updateUserPreferencesSchema>;

