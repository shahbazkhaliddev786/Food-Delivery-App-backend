import { model, Schema, Document } from "mongoose";

export interface IRestaurant extends Document {
  name: string;
  email: string;
  password: string;
  address: string;
  menu?: string[];
  image?: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const restaurantSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  menu: [{
    type: Schema.Types.ObjectId,
    ref: "Menu",
  }],
  image: {
    type: String
  },
  rating: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export const Restaurant = model<IRestaurant>("Restaurant", restaurantSchema);
