import { describe, it, expect, vi, type Mock } from "vitest";
import { createUser, validateCredentials } from "@/core/user/user.services";
import { createUserSchema, logInSchema } from "@/core/user/user.validation";
import { signUpAction, logInAction, logOutAction } from "./auth.action";

beforeEach(() => {
  vi.clearAllMocks();
});

describe('signUpAction', () => {
  it('should success and return a object with success true and the new user', async () => {})
  it('should fail and return a object with success false and the errors if the fromData is invalid', async () => {})
  it('should fail and return a object with success false and the errors if the email is used', async () => {})
  it('should fail and return a object with success false and the errors if another error ocours', async () => {})
})