'use client'

import { updatePreferencesAction } from '@/actions/preferences.action';
import SubmitButton from '@/components/ui/SubmitButton';
import { Alert, Button, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SaveIcon from '@mui/icons-material/Save';
import { useActionState } from "react"
import { PreferencesFormProps } from '@/core/preferences/preferences.types';
import ScheduleRuleItem from './ScheduleRuleItem';
import { useScheduleRules } from '@/hooks/useScheduleRules';
import { PreferencesFormState } from '@/actions/actions.types';

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
		<div className="flex flex-col items-center">
			{state.message && (
				<Alert severity={state.success ? "success" : "error"}>
					{state.message}
				</Alert>
			)}
			<div className='flex flex-wrap items-center justify-center'>
				{schedulesRules.length <= 0 && (
					<div className='m-5'>
						<Card variant='outlined'>
							<CardHeader 
								title='Você ainda não possuí nenhuma regra de horário' 
								slotProps={{
									title: {
										color: 'primary',
										variant: 'h6',
										align: 'center'
									}
								}}
							/>
							<Divider />
							<CardContent>
								<Typography variant='body1' align='center'>
									Clique no botão <strong>Adicionar Regra</strong> e após isso em <strong>Salvar</strong> para adicionar uma regra de horário
								</Typography>
							</CardContent>
						</Card>
					</div>
				)}
				{schedulesRules.map((rule, i) => (
					<ScheduleRuleItem
						key={rule.id} 
						rule={rule}
						handleDayChange={handleDayChange}
						handleTimeChange={handleTimeChange}
						handleRemove={handleRemove}
					/>
				))}
			</div>
			<div className='w-full flex items-center justify-center gap-6 px-5'>
				<Button variant='contained' onClick={handleAdd} startIcon={<AddBoxIcon />} >
					Adicionar Regra
				</Button>
				<form action={formAction}>
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
						startIcon={<SaveIcon />}
					/>
				</form>
			</div>
		</div>
	)
}