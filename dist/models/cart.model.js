import { model, Schema } from "mongoose";
const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    items: [{
            menu: {
                type: Schema.Types.ObjectId,
                ref: 'Menu',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            }
        }],
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
}, { timestamps: true });
export const Cart = model("Cart", cartSchema);
