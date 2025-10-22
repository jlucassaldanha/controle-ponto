import { PunchFieldType } from "@/components/punch/AddPunchForm"
import { SelectChangeEvent } from "@mui/material"
import { useState } from "react"

export function useAddPunch() {
	const dateNow = new Date()
	const formatedDateNow = `${dateNow.getUTCFullYear()}-${(dateNow.getUTCMonth() + 1).toString().padStart(2, '0')}-${dateNow.getUTCDate().toString().padStart(2, '0')}`
	
	const [checkToday, setCheckToday] = useState(true)
	const [date, setDate] = useState(formatedDateNow)
	const [punchFields, setPunchFields] = useState<PunchFieldType[]>([])

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