import { PunchFieldType } from "@/components/punch/AddPunchForm"
import { SelectChangeEvent } from "@mui/material"
import { PunchType } from "@prisma/client"
import { useState } from "react"

export function useAddPunch() {
	const dateNow = new Date()
	const formatedDateNow = `${dateNow.getFullYear()}-${(dateNow.getMonth() + 1).toString().padStart(2, '0')}-${dateNow.getDate().toString().padStart(2, '0')}`

	const initialFields = [
		{
			id: '1',
			time: '',
			type: PunchType.CLOCK_IN,
		},
		{
			id: '2',
			time: '',
			type: PunchType.START_LUNCH,
		},
		{
			id: '3',
			time: '',
			type: PunchType.END_LUNCH,
		},
		{
			id: '4',
			time: '',
			type: PunchType.CLOCK_OUT,
		}
	]
	
	const [checkToday, setCheckToday] = useState(true)
	const [date, setDate] = useState(formatedDateNow)
	const [punchFields, setPunchFields] = useState<PunchFieldType[]>(initialFields)

	const handleAdd = () => {
		if (punchFields.length < 4) {
			const blankPunchField = {
				id: Date.now().toString(),
				time: '',
				type: ''
			}
			setPunchFields(prev => [...prev, blankPunchField])
		}
	}

	const handleRemove = (id: string) => {
		setPunchFields(prev => prev.filter(field => field.id !== id))
	}

	const handleSelectChange = (event: SelectChangeEvent, fieldId: string) => {
		setPunchFields(currentFields => currentFields.map((field) => {
			if (field.id === fieldId) {
				return { ...field, type: event.target.value }
			}
			return field
		}))
	}

	const handleTimeChange = (fieldId: string, time: string) => {
		setPunchFields(currentFields => currentFields.map((field) => {
			if (field.id === fieldId) {
				return { ...field, time }
			}
			return field
		}))
	}

	return {
		checkToday,
		date,
		punchFields,
		setCheckToday,
		setDate,
		handleAdd,
		handleRemove,
		handleSelectChange,
		handleTimeChange,
	}
}