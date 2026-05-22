import {Router} from 'express';
import { authController } from './auth.Controller.js';
const router = Router()


router.post("/auth/signup", authController.User_Registration)



export const authRouter = router