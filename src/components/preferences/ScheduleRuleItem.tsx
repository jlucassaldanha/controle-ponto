'use client'
import { Card, CardContent, CardHeader, Checkbox, Divider, FormControlLabel, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import { ScheduleRuleItemProps } from "@/core/preferences/preferences.types"
import { daysOfWeek } from "../../core/preferences/preferences.constants"
import JourneyCard from "./JourneyCard"

export default function ScheduleRuleItem({ rule, handleDayChange, handleTimeChange, handleRemove }: ScheduleRuleItemProps) {
   return (
        <Card variant="outlined" className="m-6 max-w-[420px]">
            <CardHeader 
                title="Regra de Horário"
                action={
                    <IconButton aria-label="delete" onClick={() => handleRemove(rule.id)}>
                        <DeleteIcon />
                    </IconButton>
                }
            />
            <Divider />
            <CardContent> 
                <div className="flex flex-wrap justify-center">
                    {daysOfWeek.map(day => (
                        <FormControlLabel 
                            key={day.key}
                            control={
                                <Checkbox 
                                    checked={rule.days[day.key]}
                                    onChange={(e) => handleDayChange(rule.id, day.key, e.target.checked)}
                                />
                            }
                            label={day.label}
                        />
                    ))}
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <JourneyCard 
                        rule={rule}
                        handleTimeChange={handleTimeChange}
                        variant={{title: "Jornada", entryField: "entryTime", exitField: "exitTime"}}
                    />
                    <JourneyCard 
                        rule={rule}
                        handleTimeChange={handleTimeChange}
                        variant={{title: "Almoço", entryField: "lunchStartTime", exitField: "lunchEndTime"}}
                    />
                </div>
            </CardContent>
        </Card>
   )
}