import express from "express";
import {
  isAuthenticated,
  login,
  logout,
  registered,
  resetPassword,
  sendResendOtp,
  sendVerifyOtp,
  verifyEmail,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", registered);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);
authRouter.post("/send-reset-otp", sendResendOtp);
authRouter.post("/reset-password", resetPassword);
authRouter.get("/is-auth", userAuth, isAuthenticated); 

export default authRouter;
