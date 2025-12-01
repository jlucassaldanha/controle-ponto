import { JourneyCardProps } from "@/core/preferences/preferences.types";
import { TextField } from "@mui/material";

export default function JourneyCard({ rule, variant, handleTimeChange }: JourneyCardProps) {
	return (
		<section className="flex flex-col gap-4 m-2">
			<span className="flex justify-start w-full">{variant.title}:</span>
			<div className='flex gap-3'>
				<TextField
					variant="outlined"
					label="Entrada"
					type='time'
					name={`entryTime-${rule.id}`} 
					value={rule[variant.entryField]} 
					onChange={(e) => handleTimeChange(rule.id, variant.entryField, e.target.value)}
				/>
				<TextField
					variant="outlined"
					label="Saída"
					type='time'
					name={`exitTime-${rule.id}`} 
					value={rule[variant.exitField]} 
					onChange={(e) => handleTimeChange(rule.id, variant.exitField, e.target.value)}
				/>
			</div>
		</section>
	)
}