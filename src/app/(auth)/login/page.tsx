"use client";
import { logInAction, LogInFormState } from "@/actions/auth.action";
import SubmitButton from "@/components/ui/SubmitButton";
import { TextField, Typography } from "@mui/material";
import { useActionState } from "react";

export default function LogIn() {
  const initialState: LogInFormState = { success: false };
  const [state, formAction] = useActionState(logInAction, initialState);
  
  return (
    <section className="flex flex-col gap-8 justify-center items-center w-full h-screen">
      <Typography 
        variant="h3" 
        component="h2" 
      >
        Log In
      </Typography>
      <form action={formAction}>
        <div className="flex flex-col gap-5">
          <TextField
            variant="outlined"
            label="E-mail"
            name="email"
            id="email"
            type="email"
            error={!!state.errors?.email}
            helperText={state.errors?.email?.[0]}
          />
          <TextField
            variant="outlined"
            label="Senha"
            name="password"
            id="password"
            type="password"
            error={!!state.errors?.password}
            helperText={state.errors?.email?.[0]}
          />
          <SubmitButton text="Entrar" pendingText="Carregando..." variant="contained" />
        </div>
        {state.message && (
          <p className={state.success ? "text-green-500":"text-red-500"} >
            {state.message}
          </p>
        )}
      </form>
    </section>
  );
}
