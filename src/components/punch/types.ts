import { addPunchesActionForm } from "@/actions/actions.types"
import { SelectChangeEvent } from "@mui/material"
import { Dispatch, SetStateAction } from "react"

export type PunchFieldType = {
    id: string;
    time: string;
    type: string;
}

export type AddPunchHiddenInputsProps = { 
	date: string, 
	stringPunchFields: string
} 

export type DateInputProps = {
	date: string
	checkToday: boolean
	state: addPunchesActionForm
	setDate: Dispatch<SetStateAction<string>>
	setCheckToday: Dispatch<SetStateAction<boolean>>
}

export type PunchRegisterProps = {
	session: {
		id: string;
		username: string;
		email: string;
	}
}

export type PunchTypeTimeFormProps = {
	field: PunchFieldType
	usedPunchType: string[]
	handleRemove: (id: string) => void
	handleTimeChange: (fieldId: string, time: string) => void
	handleSelectChange: (event: SelectChangeEvent, fieldId: string) => void 
}
