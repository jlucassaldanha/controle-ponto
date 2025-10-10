'use client'
import { Button, type ButtonProps } from "@mui/material";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
	text: string,
	pendingText?: string
} & ButtonProps

export default function SubmitButton({ text, pendingText, ...rest }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
	<Button type="submit" disabled={pending} {...rest} >
		{pending ? pendingText : text}
	</Button>
  );
}