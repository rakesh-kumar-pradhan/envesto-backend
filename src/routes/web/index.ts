import { Router } from "express";
import authRouter from "./auth.route";
import dashboardRouter from "./dashboard.route";
import errorRouter from './error.route';

const webRouter = Router();

webRouter.use('/auth', authRouter);
webRouter.use('/', dashboardRouter);
webRouter.use('/error', errorRouter);

export default webRouter;