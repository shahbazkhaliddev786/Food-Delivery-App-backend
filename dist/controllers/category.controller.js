import { Category } from "../models/category.model.js";
export const createCategory = async (req, res) => {
    try {
        const { title, value } = req.body;
        const category = await Category.create({
            title,
            value,
        });
        res.status(201).json(category);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in creating category" });
    }
};
export const getCategories = async (req, res) => {
    try {
        const allCategory = await Category.find();
        res.status(200).json(allCategory);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in getting all Categories" });
    }
};
export const updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const updateData = req.body;
        if (!categoryId) {
            return res.status(404).json({ message: "Please provide category Id" });
        }
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, updateData, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(updatedCategory);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in updating category" });
    }
};
export const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        if (!categoryId) {
            return res.status(404).json({ message: "Please provide category Id" });
        }
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in deleting category" });
    }
};
//# sourceMappingURL=category.controller.js.map