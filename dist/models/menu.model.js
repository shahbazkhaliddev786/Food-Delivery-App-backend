import { model, Schema } from "mongoose";
const menuSchema = new Schema({
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
export const Menu = model("Menu", menuSchema);
