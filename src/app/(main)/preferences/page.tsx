'use client'

import { PreferencesFormState, updatePreferencesAction } from '@/actions/preferences.action';
import SubmitButton from '@/components/ui/SubmitButton';
import { Button, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useActionState, useState } from "react"

type SchedulesRulesType = {
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

type DayKey = keyof SchedulesRulesType['days']
type TimeFieldKey = 'entryTime' | 'exitTime' | 'lunchStartTime' | 'lunchEndTime'

const daysOfWeek = [
  { key: 'monday',    label: 'Seg' },
  { key: 'tuesday',   label: 'Ter' },
  { key: 'wednesday', label: 'Qua' },
  { key: 'thursday',  label: 'Qui' },
  { key: 'friday',    label: 'Sex' },
  { key: 'saturday',  label: 'Sáb' },
  { key: 'sunday',    label: 'Dom' },
] as const

export default function Preferences() {
	const [schedulesRules, setScheduleRules] = useState<SchedulesRulesType[]>([])
	const initialState: PreferencesFormState = { success: false };
	const [state, formAction] = useActionState(updatePreferencesAction, initialState);

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
                    // Cria uma cópia da regra e sobrescreve o campo de horário
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

	return (
		<div className="flex flex-col items-center gap-2">
			{schedulesRules.map((rule) => {
				return(
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
			})}
			<Button onClick={handleAdd} variant='contained'>
				Adicionar horario de trabalho
			</Button>
			<form action={formAction} className="mt-4">
				<input 
					type="hidden" 
					name="schedulesPayload" 
					value={JSON.stringify(schedulesRules)} 
				/>
				<SubmitButton 
					variant='contained' 
					text='Salvar configurações' 
					pendingText='Salvando'
				/>
				{state.message && (
					<p className={state.success ? "text-green-500":"text-red-500"} >
						{state.message}
					</p>
				)}
            </form>
		</div>
	)
}