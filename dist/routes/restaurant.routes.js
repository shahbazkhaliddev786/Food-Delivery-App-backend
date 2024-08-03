import { Router } from "express";
import { restaurantSignUp, restaurantSignIn } from "../controllers/restaurant.controller.js";
const restaurantRouter = Router();
restaurantRouter.post("/restaurant-signup", restaurantSignUp);
restaurantRouter.post("/restaurant-login", restaurantSignIn);
export default restaurantRouter;
