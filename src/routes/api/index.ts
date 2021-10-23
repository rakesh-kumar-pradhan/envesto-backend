import { Router } from "express";
import authRouter from "./auth.route";
import feedbackRouter from "./feedback.route";

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/feedback', feedbackRouter);

export default apiRouter;