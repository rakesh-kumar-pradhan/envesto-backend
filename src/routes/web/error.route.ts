import { Router } from "express";
import { ErrorController } from "../../app/controllers/index";

const errorRouter = Router();

errorRouter.get('/404', ErrorController.getRequestError);

export default errorRouter;