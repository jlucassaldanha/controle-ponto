'use client'
import { signUpAction, SignUpFormState } from '@/actions/auth.action'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant='contained' disabled={pending} >
        {pending ? 'Cadastrando...' : 'Cadastrar'}
    </Button>
  );
}

export default function SignUp() {
  const initialState: SignUpFormState = { success: false };
  const [state, formAction] = useActionState(signUpAction, initialState);

    return (
        <section className='flex justify-center items-center w-full h-screen'>
            <form action={formAction}>
                <div className='flex flex-col gap-5'>
                    <TextField 
                      variant='outlined' 
                      label="Nome" 
                      name='username' 
                      id='username' 
                      type='text' 
                      error={!!state.errors?.username} 
                      helperText={state.errors?.email?.[0]} 
                    />
                    <TextField 
                      variant='outlined' 
                      label="E-mail" 
                      name='email' 
                      id='email' 
                      type='email' 
                      error={!!state.errors?.email} 
                      helperText={state.errors?.email?.[0]} 
                    />
                    <TextField 
                      variant='outlined' 
                      label="Senha" 
                      name='password' 
                      id='password' 
                      type='password' 
                      error={!!state.errors?.password} 
                      helperText={state.errors?.email?.[0]} 
                    />
                    <SubmitButton />
                </div>
                {state.message && (
                  <p style={{ color: state.success ? 'green' : 'red' }}>
                    {state.message}
                  </p>
                )}
            </form>
        </section>
    )
}