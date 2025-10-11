'use client'

import { PreferencesFormState, updatePreferencesAction } from '@/actions/preferences.action';
import SubmitButton from '@/components/ui/SubmitButton';
import { Button } from '@mui/material';
import { useActionState } from "react"
import { PreferencesFormProps } from './preferences.types';
import ScheduleRuleItem from './ScheduleRuleItem';
import { useScheduleRules } from '@/hooks/useScheduleRules';

export default function PreferencesForm({ initialSchedules }: PreferencesFormProps) {
	const {
		schedulesRules,
		handleAdd,
		handleRemove,
		handleDayChange, 
		handleTimeChange,
	} = useScheduleRules(initialSchedules)

	const initialState: PreferencesFormState = { success: false };
	const [state, formAction] = useActionState(updatePreferencesAction, initialState);

	return (
		<div className="flex flex-col items-center gap-2">
			{schedulesRules.map((rule, i) => (
				<ScheduleRuleItem
					key={i} 
					rule={rule}
					handleDayChange={handleDayChange}
					handleTimeChange={handleTimeChange}
					handleRemove={handleRemove}
				/>
			))}
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