'use client'
import { PreferencesFormState, updatePreferencesAction } from '@/actions/preferences.action';
import SubmitButton from '@/components/ui/SubmitButton';
import { Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useActionState } from "react"
import { PreferencesFormProps } from '@/core/preferences/preferences.types';
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
					key={rule.id} 
					rule={rule}
					handleDayChange={handleDayChange}
					handleTimeChange={handleTimeChange}
					handleRemove={handleRemove}
				/>
			))}
			<Button variant='contained' onClick={handleAdd} startIcon={<AddBoxIcon />} >
				Adicionar
			</Button>
			<form action={formAction} className="mt-4 flex flex-col gap-2 justify-center items-center">
				<input 
					type="hidden" 
					name="schedulesPayload" 
					value={JSON.stringify(schedulesRules)} 
				/>
				<SubmitButton 
					className='w-[140px]'
					variant='contained' 
					text='Salvar' 
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