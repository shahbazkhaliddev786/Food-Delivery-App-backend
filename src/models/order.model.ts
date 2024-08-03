import { model, Schema, Document } from "mongoose";

export interface IOrder extends Document {
  orderedBy: string;
  items: {
    menu: string;
    quantity: number;
  }[];
  totalPrice: number;
  status: 'Pending' | 'Completed' | 'Cancelled';
  orderDate: Date;
  deliveryAddress: string;
  paymentMethod: 'Credit Card' | 'Debit Card' | 'Cash' | 'PayPal';
}

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

export const Order = model<IOrder>("Order", orderSchema);