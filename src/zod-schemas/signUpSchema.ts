import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(15, "Username must be less than 15 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username should not contain special characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(3, { message: "password must be at least 3 characters" }),
});
