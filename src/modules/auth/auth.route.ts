import {Router} from 'express';
import { authController } from './auth.Controller.js';
const router = Router()


router.post("/auth/signup", authController.User_Registration)
router.post("/auth/login", authController.User_Login)



export const authRouter = router