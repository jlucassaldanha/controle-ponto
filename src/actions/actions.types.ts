import { User } from "@prisma/client";

export type SignUpFormState = {
  success: boolean;
  message?: string;
  errors?: {
	username?: string[] | undefined;
	email?: string[] | undefined;
	password?: string[] | undefined;
	confirm_password?: string[] | undefined;
  };
  user?: Omit<User, 'passwordHash'>; 
}

export type LogInFormState = {
	success: boolean
	message?: string
	errors?: {
		email?: string[] | undefined
		password?: string[] | undefined
	}
}

export type PreferencesFormState = {
	success: boolean;
	message?: string;
	errors?: {
		schedules?: string[] | undefined;
	};
}

export type BalanceTimeFormState = {
	success: boolean;
	message?: string;
	errors?: {
		time?: string[] | undefined;
	};
}

export type addPunchesActionForm = {
	success: boolean
	errors?: {
		date?: string[] | undefined;
		punches?: string[] | undefined;
	}
	message?: string
}