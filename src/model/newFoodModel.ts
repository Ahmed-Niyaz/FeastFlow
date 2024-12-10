import mongoose, { Schema, Document } from "mongoose";

enum FoodCategory {
  APPETIZER = "Appetizer",
  MAIN_COURSE = "Main-course",
  DESSERT = "Dessert",
  BEVERAGE = "Beverages",
  SIDE_DISH = "Side-dish",
}

export const foodCategories = [
  "Appetizer",
  "Main-course",
  "Dessert",
  "Beverages",
  "Side-dish",
];

export interface FooodItemInterface extends Document {
  name: string;
  description: string;
  price: number;
  category: FoodCategory;
  imageUrl: string;
}

const newFoodSchema: Schema<FooodItemInterface> = new Schema({
  name: { type: String, required: [true, "Food name is required"], trim: true },
  description: {
    type: String,
    required: [true, "Please provide description about food"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Please provide price for food"],
  },
  category: {
    type: String,
    enum: {
      values: Object.values(FoodCategory),
      message: "{VALUE} is not a valid food category",
    },
    required: [true, "Please provide category for food"],
  },
  imageUrl: {
    type: String,
    required: [true, "Please provide an image for the food"],
  },
});

const newFoodModel =
  (mongoose.models.Food as mongoose.Model<FooodItemInterface>) ||
  mongoose.model<FooodItemInterface>("Food", newFoodSchema);

export default newFoodModel;
