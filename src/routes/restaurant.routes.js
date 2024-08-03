"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var restaurant_controller_js_1 = require("../controllers/restaurant.controller.js");
var restaurantRouter = (0, express_1.Router)();
restaurantRouter.post("/restaurant-signup", restaurant_controller_js_1.restaurantSignUp);
restaurantRouter.post("/restaurant-login", restaurant_controller_js_1.restaurantSignIn);
exports.default = restaurantRouter;
