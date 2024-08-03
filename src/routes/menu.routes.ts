import { Router } from "express";
import { createMenu, deleteMenu, getMenus, updateMenu } from "../controllers/menu.controller.js";

const menuRouter = Router();

menuRouter.post("/create", createMenu);
menuRouter.get("/", getMenus);
menuRouter.patch("/:menuId", updateMenu);
menuRouter.delete("/:menuId", deleteMenu);

export default menuRouter;
