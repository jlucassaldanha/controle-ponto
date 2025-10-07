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
    username?: string[];
    email?: string[];
    password?: string[];
  };
  user?: Omit<User, 'passwordHash'>; // Retorna o usuário seguro em caso de sucesso
}