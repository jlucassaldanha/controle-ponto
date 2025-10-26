'use client'
import { Card, CardContent, CardHeader, Checkbox, Divider, FormControlLabel, IconButton, TextField } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import { ScheduleRuleItemProps } from "@/core/preferences/preferences.types"
import { daysOfWeek } from "../../core/preferences/preferences.constants"

export default function ScheduleRuleItem({ rule, handleDayChange, handleTimeChange, handleRemove }: ScheduleRuleItemProps) {
   return (
        <Card variant="outlined" className="m-6">
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
                <div className='flex flex-col md:flex-row gap-5 justify-center items-center'>
                    <section className="flex flex-col gap-4 m-2">
                        <span className="flex justify-start w-full">Jornada:</span>
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
                    </section>
                    <section className="flex flex-col gap-4 m-2">
                        <span className="flex justify-start w-full">Almoço:</span>
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
                    </section>
                </div>
            </CardContent>
        </Card>
   )
}