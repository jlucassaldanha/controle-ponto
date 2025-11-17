import { User } from "@prisma/client";

export type BaseFormState = {
	success: boolean;
  	message?: string;
}

export type SignUpFormState = {
  errors?: {
	username?: string[] | undefined;
	email?: string[] | undefined;
	password?: string[] | undefined;
	confirm_password?: string[] | undefined;
  };
  user?: Omit<User, 'passwordHash'>; 
} & BaseFormState

export type LogInFormState = {
	errors?: {
		email?: string[] | undefined
		password?: string[] | undefined
	}
} & BaseFormState

export type PreferencesFormState = {
	errors?: {
		schedules?: string[] | undefined;
	};
} & BaseFormState

export type BalanceTimeFormState = {
	errors?: {
		time?: string[] | undefined;
	};
} & BaseFormState

export type addPunchesActionForm = {
	errors?: {
		date?: string[] | undefined;
		punches?: string[] | undefined;
	}
} & BaseFormState