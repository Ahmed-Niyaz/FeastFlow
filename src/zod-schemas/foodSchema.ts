import { FoodCategory } from "@/model/foodModel";
import { z } from "zod";

export const FoodUploadValidationSchema = z.object({
  name: z.string().min(1, "Food name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().transform((val) => Number(val)),
  category: z.enum(Object.values(FoodCategory) as [string, ...string[]], {
    errorMap: () => ({ message: "Invalid Food Category" }),
  }),
  imageUrl: z.string().url("Invalid image url"),
});