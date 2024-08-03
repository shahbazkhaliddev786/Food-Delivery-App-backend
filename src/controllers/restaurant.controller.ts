import { RequestHandler, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Restaurant } from "../models/restaurant.model.js";
const RESTAURANT_JWT_SECRET = "Restaurant123";

export const restaurantSignUp: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const { name, email, password, address, image, rating }: IRestaurantData = req.body;

    const existingRestaurant = await Restaurant.findOne({ email });
    if (existingRestaurant) {
      return res.status(400).json({ message: "This user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const restaurant = await Restaurant.create({
      name,
      email,
      password: hashedPassword,
      address,
      image,
      rating,
    });
    res.status(201).json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const restaurantSignIn: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email, password }: IRestaurantData = req.body;

    const restaurant = await Restaurant.findOne({ email });

    if (!restaurant) return res.json({ message: "Restaurant not found" });
    // if (!restaurant.isVerified) return res.status(400).json({ message: 'Email not verified.' });

    const isValidPassword = await bcrypt.compare(password, restaurant.password);

    if (!isValidPassword) return res.json({ message: "Incorrect password" });

    const token = jwt.sign(
      {
        name: restaurant.name,
        email: restaurant.email,
        restaurantId: restaurant.id,
      },
      RESTAURANT_JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(200).json({ restaurant, token });
  } catch (error) {
    console.log(error);
  }
};
