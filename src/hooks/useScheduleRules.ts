import { DayKey, SchedulesRulesType, TimeFieldKey } from "@/components/preferences/preferences.types";
import { useState } from "react";

export function useScheduleRules(initialSchedules: SchedulesRulesType[]) {
    const [schedulesRules, setScheduleRules] = useState<SchedulesRulesType[]>(initialSchedules)

    const handleDayChange = (ruleId: string, dayKey: DayKey, isChecked: boolean) => {
        setScheduleRules(currentRules => 
            currentRules.map(rule => {
                if (rule.id === ruleId) {
                    return {
                        ...rule,
                        days: {
                            ...rule.days,
                            [dayKey]: isChecked,
                        },
                    }
                }
                return rule
            })
        )
    }

    const handleTimeChange = (ruleId: string, field: TimeFieldKey, value: string) => {
        setScheduleRules(currentRules =>
            currentRules.map(rule => {
                if (rule.id === ruleId) {
                    return { ...rule, [field]: value };
                }
                return rule;
            })
        );
    };

    const handleAdd = () => {
        const newEmptyRule: SchedulesRulesType = {
            id: Date.now().toString(),
            entryTime: '08:00',
            exitTime: '18:00',
            lunchStartTime: '12:00',
            lunchEndTime: '13:00',
            days: {
                sunday: false,
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: false,
            }
        }
        setScheduleRules(prev => [...prev, newEmptyRule])
    }

    const handleRemove = (id: string) => {
        setScheduleRules(prev => prev.filter(rule => rule.id !== id))
    }

    return {
        schedulesRules,
        handleAdd,
        handleRemove,
        handleDayChange,
        handleTimeChange
    }
    
}