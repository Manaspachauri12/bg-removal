import express from "express";
import {
  clerkWebhook,
  paymentRazorpay,
  userCredits,
  verifyRazorpay,
} from "../controllers/UserController.js";
import authUser from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/webhooks", clerkWebhook);
userRouter.get("/credits", authUser, userCredits);
userRouter.post("/pay-razor", authUser, paymentRazorpay); // Assuming paymentRazorpay is defined in UserController.js
userRouter.post("/verify-razor", verifyRazorpay);

export default userRouter;
