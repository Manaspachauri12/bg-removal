import express from 'express';
import { clerkWebhook, userCredits } from '../controllers/UserController.js';
import authUser from '../middlewares/auth.js';


const userRouter = express.Router();



userRouter.post('/webhooks', clerkWebhook);
userRouter.get('/credits',authUser,userCredits);


export default userRouter;