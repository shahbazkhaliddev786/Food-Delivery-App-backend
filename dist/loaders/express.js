import cors from 'cors';
import express from "express";
import helmet from "helmet";
import cookieParser from 'cookie-parser';
import morgan from "morgan";
import passport from 'passport';
import kPassport from "../middlewares/passport.js";
import { authChecker } from '../middlewares/authChecker.js';
import authRouter from "../routes/auth.routes.js";
import menuRouter from '../routes/menu.routes.js';
import categoryRouter from '../routes/category.routes.js';
import cartRouter from '../routes/cart.routes.js';
import orderRouter from '../routes/order.routes.js';
import restaurantRouter from '../routes/restaurant.routes.js';
export default async function ({ app }) {
    // - This indicates your server is up or down when it's running, It's just a status
    //   checkpoint that add all of my servers to make sure that if it's up or down.
    // - If I hit an endpoint, If I see I get positive or negative response. If negative
    //   response it's mean servers are probably down. If I get positive response it's
    //   mean servers are still up and running. The error will be somewhere else like 500
    //   errors, middlewares or other code.
    app.get("/status", (req, res) => res.sendStatus(200).end());
    app.head("/status", (req, res) => res.sendStatus(200).end());
    app.enable("trust-proxy"); // This gives us real IP origin, if we were behind reverse
    // proxy like nginx.
    app.use(helmet({
        contentSecurityPolicy: false
    }));
    app.use(cors());
    app.use(express.json({ limit: "15kb" }));
    app.use(express.urlencoded({ extended: true, limit: "15kb" }));
    app.use(express.static("public"));
    app.use(cookieParser());
    app.use(morgan("tiny"));
    app.use(passport.initialize());
    kPassport(passport);
    // global routes
    app.use("/api/v1/user", authRouter);
    app.use("/api/v1/menu", menuRouter);
    app.use("/api/v1/restaurant", restaurantRouter);
    app.use("/api/v1/category", categoryRouter);
    app.use("/api/v1/cart", cartRouter);
    app.use("/api/v1/order", orderRouter);
    app.get("/dashboard", authChecker, (req, res) => {
        res.json({ message: "Dashboard" });
    });
}
