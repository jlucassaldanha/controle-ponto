'use client'
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material"
import { ScheduleRuleItemProps } from "./preferences.types"
import { daysOfWeek } from "./preferences.constants"

export default function ScheduleRuleItem({ rule, handleDayChange, handleTimeChange, handleRemove }: ScheduleRuleItemProps) {
   return (
        <div key={rule.id} className='flex flex-col gap-5 justify-center items-center'>
            <div>
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
            <div className='flex gap-5 justify-center items-center'>
                Jornada:
                <div className='flex gap-3'>
                    <TextField
                        variant="outlined"
                        label="Entrada"
                        type='time'
                        name={`entryTime-${rule.id}`} 
                        value={rule.entryTime} 
                        onChange={(e) => handleTimeChange(rule.id, 'entryTime', e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        label="Saida"
                        type='time'
                        name={`exitTime-${rule.id}`} 
                        value={rule.exitTime} 
                        onChange={(e) => handleTimeChange(rule.id, 'exitTime', e.target.value)}
                    />
                </div>
                Almoço:
                <div className='flex gap-3'>
                    <TextField
                        variant="outlined"
                        label="Entrada"
                        type='time' 
                        name={`lunchStartTime-${rule.id}`} 
                        value={rule.lunchStartTime} 
                        onChange={(e) => handleTimeChange(rule.id, 'lunchStartTime', e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        label="Saida"
                        type='time' 
                        name={`lunchEndTime-${rule.id}`} 
                        value={rule.lunchEndTime} 
                        onChange={(e) => handleTimeChange(rule.id, 'lunchEndTime', e.target.value)}
                    />
                </div>
            </div>
            <Button 
                onClick={() => handleRemove(rule.id)} 
                variant='contained'
            >
                Remover
            </Button>
        </div>
   )
}