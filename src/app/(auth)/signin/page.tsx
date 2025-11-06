"use client";
import { signUpAction, SignUpFormState } from "@/actions/auth.action";
import SubmitButton from "@/components/ui/SubmitButton";
import { Alert, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { redirect } from "next/navigation";
import { useActionState } from "react";

export default function SignUp() {
  const initialState: SignUpFormState = { success: false };
  const [state, formAction] = useActionState(signUpAction, initialState);

  state.success && redirect('/login')
  return (
    <section className="flex flex-col justify-center items-center w-full h-screen">
      <Typography 
        variant="h3" 
        component="h2" 
      >
        Criar conta
      </Typography>
      <form action={formAction}>
        <div className="flex flex-col gap-5 m-9">
          <TextField
            variant="outlined"
            label="Nome"
            name="username"
            id="username"
            type="text"
            error={!!state.errors?.username}
            helperText={state.errors?.email?.[0]}
          />
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
          <SubmitButton text="Cadastrar" pendingText="Cadastrando..." variant="contained" />
        </div>
        {state.message && (
          <Alert severity={state.success ? "success" : "error"}>
            {state.message}
          </Alert>
        )}
      </form>
    </section>
  );
}
