import { z } from "zod";

export const userValidationSchema = z.object({
  username: z
    .string()
    .min(1, "Please enter username")
    .max(15, "Username must be less than 15 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username should not contain special characters"),

  email: z.string().email("Please enter valid email"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});
