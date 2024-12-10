import { z } from "zod";

export const deliveryInfoSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 1 characters")
    .max(15, "Name must be less than 15 characters"),
  email: z.string().email("Invalid email address"),
  city: z.string(),
  state: z.string(),
  pincode: z.string(),
  country: z.string(),
  phone: z.string()
});
