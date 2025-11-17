import { type ButtonProps } from "@mui/material"

export type ProfileProps = {
	username: string
}

export type SubmitButtonProps = {
	text: string,
	pendingText?: string
} & ButtonProps