'use client'
import { signUpAction } from '@/actions/auth.action';
import { SignupFormState } from '@/core/user/user.types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant='contained' disabled={pending} >
        {pending ? 'Cadastrando...' : 'Cadastrar'}
    </Button>
  );
}

export default function SignIn() {
    const initialState: SignupFormState = { success: false };
  const [state, formAction] = useFormState
  (signUpAction, initialState);

    return (
        <section className='flex justify-center items-center w-full h-screen'>
            <form action={formAction}>
                <div className='flex flex-col gap-5'>
                    <TextField variant='outlined' label="Nome" name='username' />
                    <TextField variant='outlined' label="E-mail" name='email' />
                    <TextField variant='outlined' label="Senha" name='password' />
                    <SubmitButton />
                </div>
            </form>
        </section>
        
    )
}