import { Router } from "express";
import { createOrder, getOrderById, updateOrderStatus, deleteOrder, getAllOrders } from "../controllers/order.controller.js";
const orderRouter = Router();
orderRouter.post("/create", createOrder);
orderRouter.get("/:orderId", getOrderById);
orderRouter.get("/", getAllOrders);
orderRouter.patch("/:orderId/status", updateOrderStatus);
orderRouter.delete("/:orderId", deleteOrder);
export default orderRouter;
