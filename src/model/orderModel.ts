import mongoose, { Schema, Document } from "mongoose";
import { FoodCategory, IFoodItem } from "./foodModel";

type OrderStatus = "Processing" | "Out for Delivery" | "Delivered";


export interface OrderInterface extends Document {
  userId: string;
  items: object;
  amount: number;
  address: object;
  status: OrderStatus;
  date: Date;
  payment: boolean;
}

const OrderSchema: Schema<OrderInterface> = new Schema({
  userId: { type: String, required: true },
  items: {
    type: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: { 
          type: String, 
          enum: Object.values(FoodCategory),
          required: true 
        },
        imageUrl: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
      }
    ],
    required: true,
  },
  amount: { type: Number, required: true },
  address: {
    type: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    _id: false,
    required: true,
  },
  status: { type: String, default: "Processing" },
  date: { type: Date, default: Date.now },
  payment: { type: Boolean, default: false },
});

const OrderModel =
  mongoose.models.Orders ||
  mongoose.model<OrderInterface>("Orders", OrderSchema);

export default OrderModel;
