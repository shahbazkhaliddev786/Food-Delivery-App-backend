import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";
export const JWT_SECRET = "Secret123";
// sign up - send email or otp on signup
export const signUp = async (req, res) => {
    try {
        const { name, email, password, profile } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "This user already exists" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profile,
        });
        // const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
        // const url = `${process.env.CLIENT_URL}/verify/${token}`;
        // await sendEmail(email, 'Verify Email', `Click <a href="${url}">here</a> to verify your email.`);
        res.status(201).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
// send verification email - // app password: rhoo ongx cfwv ozfy
export const sendVerificationMail = async (req, res, next) => {
    const { email } = req.body;
    try {
        console.log("Starting sendVerificationMail");
        const user = (await User.findOne({ email }));
        console.log("User found:", user);
        if (!user)
            return res.json({ message: "User not exists" });
        if (user.isVerified)
            return res.json({ message: "User already verified" });
        console.log("User not verified yet");
        const encryptedToken = await bcrypt.hash(user._id.toString(), 8);
        console.log("Token encrypted");
        const jwtToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: "60m",
        });
        console.log("JWT token generated");
        sendEmail(email, "Email verification", `<div>Your verification link: <a href="http://localhost:3000/verify-email/${jwtToken}">verify</a></div>`);
        console.log("Mail sent:");
        await User.updateOne({ email }, { $set: { verifyToken: encryptedToken } });
        console.log("User updated with verification token");
        res.json({
            message: `Check your email inbox, verify email`,
        });
    }
    catch (error) {
        console.error("Error in sending mail:", error);
        res.status(500).json({ message: "Error in sending mail" });
    }
};
// resend email
// verify mail
export const verifyMail = async (req, res) => {
    try {
        const { token } = req.body;
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decodedToken.userId);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        await User.updateOne({
            $set: { isVerified: true },
            $unset: { verifyToken: 0 }
        });
        res.status(200).json({ message: "Email verified" });
    }
    catch (error) {
        res.status(500).json({ message: "Error in verifying email", error });
    }
};
// signIn
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
            return res.json({ message: "User not found" });
        // if (!user.isVerified) return res.status(400).json({ message: 'Email not verified.' });
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword)
            return res.json({ message: "Incorrect password" });
        const token = jwt.sign({
            name: user.name,
            email: user.email,
            userId: user.id,
        }, JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({ user, token });
    }
    catch (error) {
        console.log(error);
    }
};
// forget password
export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const encryptedToken = await bcrypt.hash(user._id.toString(), 8);
        console.log("Token encrypted");
        const jwtToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: "60m",
        });
        console.log("JWT token generated");
        // send email
        await User.updateOne({ email }, { $set: { verifyToken: encryptedToken } });
        console.log("User updated with verification token");
        res.json({
            message: `Reset Password link sent, check your email inbox`
        });
    }
    catch (error) {
        res.status(500).json({ message: "Can't reset password" });
    }
};
// verify forgot password token
export const verifyForgotPasswordToken = async (req, res) => {
    try {
        const { token, password } = req.body;
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decodedToken.userId);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.updateOne({
            $set: { password: hashedPassword },
            $unset: { verifyToken: 0 }
        });
        res.status(200).json({ message: "Password Changed Successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error in verifying email", error });
    }
};
// reset password
// fetch user by id to display in profile
export const fetchUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
// update user profile
// signOut
// delete user profile
export const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "Profile deleted successfully." });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
// OAuth
//# sourceMappingURL=auth.controller.js.map