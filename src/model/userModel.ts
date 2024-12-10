import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  cartData?: object;
}

const UserSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  { minimize: false },
);

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
