'use server'

import { signIn, signOut } from "@/app/api/auth/[...nextauth]/route"
import { createUser } from "@/core/user/user.services"
import { createUserSchema, logInSchema } from "@/core/user/user.validation"
import { AuthError } from "next-auth"
import { z } from "zod"

export async function signUpAction(formData: FormData) {   
    const rawData = Object.fromEntries(formData)

    const validateFormData = createUserSchema.safeParse(rawData)

    if (!validateFormData.success) {
        return { success: false, errors: z.flattenError(validateFormData.error).fieldErrors }
    }

    try {
        const newUser = await createUser(validateFormData.data)

        if (!newUser) {
            return { success: false, message: "Este email já está em uso." }
        }

        return { success: true, user: newUser }
    } catch (error) {
        return { success: false, message: "Ocorreu um erro no servidor." }
    }
}

export async function logInAction(formData: FormData) {
    const rawData = Object.fromEntries(formData)

    const validateFormData = logInSchema.safeParse(rawData)

    if (!validateFormData.success) {
        return { success: false, errors: z.flattenError(validateFormData.error).fieldErrors }
    }

    try {
        await signIn('credentials', {
            ...validateFormData.data,
            redirectTo: '/dashboard'
        })

        return { success: true }
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.type === 'CredentialsSignin') {
                return { success: false, message: 'E-mail ou senha inválidos.'}
            } else {
                return { success: false, message: 'Ocorreu um erro durante o login.'}
            }
        }

        throw error
    }
}

export async function logOutAction() {
    await signOut({ redirectTo: '/login' })
}