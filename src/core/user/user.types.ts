import { User } from '@prisma/client';

export type UserDataType = {
	email: string
	username: string
	password: string
}

export type SignupFormState = {
  success: boolean;
  message?: string;
  errors?: {
    username?: string[] | undefined;
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
  user?: Omit<User, 'passwordHash'>; // Retorna o usuário seguro em caso de sucesso
}