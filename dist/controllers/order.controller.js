import { Order } from "../models/order.model.js";
import { Menu } from "../models/menu.model.js";
export const createOrder = async (req, res) => {
    try {
        const { orderedBy, items, deliveryAddress, paymentMethod, status, orderDate } = req.body;
        let totalPrice = 0;
        for (const item of items) {
            const menu = await Menu.findById(item.menu);
            if (!menu) {
                return res.status(404).json({ message: `Menu item with id ${item.menu} not found` });
            }
            totalPrice += menu.price * item.quantity;
        }
        const order = await Order.create({
            orderedBy,
            items,
            totalPrice,
            deliveryAddress,
            paymentMethod,
            status: status ?? 'Pending',
            orderDate: orderDate ?? new Date()
        });
        res.status(201).json(order);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in creating order" });
    }
};
export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId).populate('items.menu');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in fetching order" });
    }
};
export const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find();
        res.status(200).json(allOrders);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in getting all orders" });
    }
};
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.status = status ?? order.status;
        await order.save();
        res.status(200).json(order);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in updating order status" });
    }
};
export const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in deleting order" });
    }
};
