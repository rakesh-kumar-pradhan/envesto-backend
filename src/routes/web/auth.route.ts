import { AuthController } from "../../app/controllers/auth.controller";
import { Router } from "express";

const authRouter = Router();

authRouter.get('/login', AuthController.getLogin);
authRouter.post('/login', AuthController.postLogin);

authRouter.get('/sign-up', AuthController.getSignUp);
authRouter.get('/logout', AuthController.onLogout);

export default authRouter;