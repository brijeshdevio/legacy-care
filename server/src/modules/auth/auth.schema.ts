import { z } from "zod";

const password = z
  .string()
  .min(6, "Password must be at least 6 characters long")
  .max(30, "Password must be less than 30 characters long");

export const RegisterSchema = z
  .object({
    name: z.string().min(3).max(30),
    email: z.email("Invalid email address"),
    role: z.enum(["planner", "provider"]).default("planner"),
    password: password,
    confirmPassword: password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .strict();

export const LoginSchema = z
  .object({
    email: z.email("Invalid email address"),
    password: password,
  })
  .strict();

export type RegisterDto = z.infer<typeof RegisterSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;
