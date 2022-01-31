import { Router } from "express";
import authRouter from "./auth.route";
import feedbackRouter from "./feedback.route";
import feedRouter from './feed.route';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/feedback', feedbackRouter);
apiRouter.use('/feed', feedRouter)

export default apiRouter;