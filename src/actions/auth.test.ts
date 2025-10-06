import { describe, it, expect, vi, type Mock } from "vitest";
import { signUpAction, logInAction, logOutAction } from "./auth.action";

beforeEach(() => {
  vi.clearAllMocks();
});