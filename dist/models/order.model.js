import { model, Schema } from "mongoose";
const orderSchema = new Schema({
    orderedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
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
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending',
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'Cash', 'PayPal'],
        // required: true,
    }
});
export const Order = model("Order", orderSchema);
//# sourceMappingURL=order.model.js.map