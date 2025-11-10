import { z } from 'zod'

export const createUserSchema = z.object({
	username: z.string().trim().min(3, { message: "Nome de usuário deve ter pelo menos 3 letras." }),
	email: z.string().email({ message: "Insira um email valido." }),
	password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres." }),
	confirm_password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres." })
})
.refine((data) => data.password === data.confirm_password, {
	message: "As senhas devem ser iguais.",
	path: ["confirm_password"],
})

export type CreateUserSchemaType = z.infer<typeof createUserSchema>;

export const logInSchema = z.object({
	email: z.string().email({ message: "Insira um email valido." }),
	password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres." })
})

export type LogInSchemaType = z.infer<typeof logInSchema>;