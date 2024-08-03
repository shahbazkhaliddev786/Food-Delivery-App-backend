import { Cart } from "../models/cart.model.js";
import { Menu } from "../models/menu.model.js";
export const addToCart = async (req, res) => {
    try {
        const { userId, menuId, quantity } = req.body;
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [], totalPrice: 0 });
        }
        if (!menuId) {
            return res.status(400).json({ message: "Menu ID is required" });
        }
        const menu = await Menu.findById(menuId);
        if (!menu) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        const existingItemIndex = cart.items.findIndex(item => item.menu.toString() === menuId);
        if (existingItemIndex >= 0) {
            cart.items[existingItemIndex].quantity += quantity;
        }
        else {
            cart.items.push({ menu: menuId, quantity: quantity });
        }
        cart.totalPrice += menu.price * quantity;
        await cart.save();
        res.status(201).json(cart);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in adding to cart" });
    }
};
export const removeFromCart = async (req, res) => {
    try {
        const { userId, menuId } = req.body;
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const itemIndex = cart.items.findIndex(item => item.menu.toString() === menuId);
        if (itemIndex >= 0) {
            const menu = await Menu.findById(menuId);
            cart.totalPrice -= menu.price * cart.items[itemIndex].quantity;
            cart.items.splice(itemIndex, 1);
            await cart.save();
            return res.status(200).json(cart);
        }
        res.status(404).json({ message: "Menu item not found in cart" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in removing from cart" });
    }
};
export const updateCartItemQuantity = async (req, res) => {
    try {
        const { userId, menuId, quantity } = req.body;
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const itemIndex = cart.items.findIndex(item => item.menu.toString() === menuId);
        if (itemIndex >= 0) {
            const menu = await Menu.findById(menuId);
            cart.totalPrice -= menu.price * cart.items[itemIndex].quantity;
            cart.items[itemIndex].quantity = quantity;
            cart.totalPrice += menu.price * quantity;
            await cart.save();
            return res.status(200).json(cart);
        }
        res.status(404).json({ message: "Menu item not found in cart" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in updating cart item quantity" });
    }
};
export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ user: userId }).populate('items.menu');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in fetching cart" });
    }
};
export const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();
        res.status(200).json(cart);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in clearing cart" });
    }
};
