import { Router } from "express";
import { signUp, signIn, sendVerificationMail, verifyMail, forgetPassword, verifyForgotPasswordToken } from "../controllers/auth.controller.js";
import { loginValidations, signupValidations } from "../validations/auth.validations.js";
import { validationErrors } from "../validations/validations.js";
const authRouter = Router();
authRouter.post("/signup", signupValidations(), validationErrors, signUp);
authRouter.post("/login", loginValidations(), validationErrors, signIn);
authRouter.post("/send", sendVerificationMail);
authRouter.post("/verify", verifyMail);
authRouter.post("/forgot", forgetPassword);
authRouter.post("/forgot-verify", verifyForgotPasswordToken);
export default authRouter;
//# sourceMappingURL=auth.routes.js.map