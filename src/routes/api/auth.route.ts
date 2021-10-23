import { AuthController } from "../../controllers/index";
import { Router } from "express";

const authRouter = Router();

authRouter.post('/sign-up', AuthController.onSignUp);
authRouter.post('/login', AuthController.onLoginWithPhoneOtp);
authRouter.post('/verify-otp', AuthController.onVerifyOtp);
authRouter.post('/sign-in', AuthController.onSignIn);

authRouter.get('/video', AuthController.getVideo);

export default authRouter;