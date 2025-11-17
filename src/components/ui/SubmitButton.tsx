'use client'

import { Button } from "@mui/material";
import { useFormStatus } from "react-dom";
import { SubmitButtonProps } from "./types";

export default function SubmitButton({ text, pendingText, ...rest }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  
  return (
	<Button type="submit" disabled={pending} {...rest} >
		{pending ? pendingText : text}
	</Button>
  );
}