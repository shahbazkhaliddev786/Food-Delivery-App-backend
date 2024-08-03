import { model, Schema, Document } from "mongoose";

export interface IMenu extends Document {
  title: string;
  description: string;
  category: string;
  image?: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
}

const menuSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  discountPercentage: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export const Menu = model<IMenu>("Menu", menuSchema);
