import { Menu } from "../models/menu.model.js";
export const createMenu = async (req, res) => {
    try {
        const { title, description, category, image, price, stock, discountPercentage, rating } = req.body;
        const menu = await Menu.create({
            title,
            description,
            category,
            image,
            price,
            stock,
            discountPercentage,
            rating
        });
        res.status(201).json(menu);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in creating menu" });
    }
};
export const getMenus = async (req, res) => {
    try {
        const allMenus = await Menu.find();
        res.status(200).json(allMenus);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in getting all menus" });
    }
};
export const updateMenu = async (req, res) => {
    try {
        const { menuId } = req.params;
        const updateData = req.body;
        if (!menuId) {
            return res.status(404).json({ message: "Please provide menu id" });
        }
        const menu = await Menu.findByIdAndUpdate(menuId, updateData, { new: true });
        if (!menu) {
            return res.status(404).json({ message: "Menu Item not found" });
        }
        res.status(200).json(menu);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in updating menu" });
    }
};
export const deleteMenu = async (req, res) => {
    try {
        const { menuId } = req.params;
        if (!menuId) {
            return res.status(404).json({ message: "Please provide menu id" });
        }
        const menu = await Menu.findByIdAndDelete(menuId);
        if (!menu) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        res.status(200).json({ message: "Menu item deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in deleting menu" });
    }
};
//# sourceMappingURL=menu.controller.js.map