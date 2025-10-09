'use client'
import { Button } from "@mui/material";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ text, pendingText }: {text: string, pendingText: string}) {
  const { pending } = useFormStatus();
  return (
	<Button type="submit" variant='contained' disabled={pending} >
		{pending ? pendingText : text}
	</Button>
  );
}