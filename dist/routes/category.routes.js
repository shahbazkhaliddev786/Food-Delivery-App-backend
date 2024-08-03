import { Router } from "express";
import { createCategory, getCategories, updateCategory, deleteCategory } from "../controllers/category.controller.js";
const categoryRouter = Router();
categoryRouter.post("/create", createCategory);
categoryRouter.get("/", getCategories);
categoryRouter.patch("/:categoryId", updateCategory);
categoryRouter.delete("/:categoryId", deleteCategory);
export default categoryRouter;
