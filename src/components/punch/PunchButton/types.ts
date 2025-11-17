export type feedbackMessageType = { 
	message: string | null, 
	type: "error" | "success"
}

export type PunchButtonProps = {
	disabled: boolean
}