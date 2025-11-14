import { AddPunchHiddenInputsProps } from "./types";

export default function AddPunchHiddenInputs({ date, stringPunchFields }: AddPunchHiddenInputsProps) {
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