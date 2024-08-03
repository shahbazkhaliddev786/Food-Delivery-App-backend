import { Router } from "express";
import { addToCart, removeFromCart, updateCartItemQuantity, getCart, clearCart } from "../controllers/cart.controller.js";
const cartRouter = Router();
cartRouter.post("/add", addToCart);
cartRouter.delete("/remove", removeFromCart);
cartRouter.patch("/update-quantity", updateCartItemQuantity);
cartRouter.get("/:userId", getCart);
cartRouter.delete("/clear/:userId", clearCart);
export default cartRouter;
