import mongoose, { Schema } from "mongoose";
import { IUser, IItem } from "./model_types";

const itemSchema: Schema = new Schema(
  {
    itemName: { type: String, required: true },
    itemPrice: { type: String, required: true },
    itemCategory: { type: String, required: true },
    itemsInStock: { type: Number, required: true },
    reduced: { type: Boolean, required: false },
    percentageReduced: { type: Number, required: true },
  },
  { timestamps: true }
);
const userSchema: Schema = new Schema(
  {
    // name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    shoppingCart: [itemSchema],
    terms: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const Item = mongoose.model<IItem>("Item", itemSchema);
export const User = mongoose.model<IUser>("User", userSchema);
