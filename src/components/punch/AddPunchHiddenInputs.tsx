export default function AddPunchHiddenInputs({ date, stringPunchFields }: { date: string, stringPunchFields: string}) {
	return (
		<div>
			<input 
				type="hidden" 
				name="punches" 
				value={stringPunchFields} 
			/>
			<input 
				type="hidden" 
				name="date" 
				value={date} 
			/>
		</div>
	)
}