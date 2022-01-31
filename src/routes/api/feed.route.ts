import { FeedController } from "../../controllers/index";
import { Router } from "express";
import {upload, verifyUserToken} from "../../middlewares/index";

const feedRouter = Router();
feedRouter.use(verifyUserToken);

feedRouter.post('/', upload.any(), FeedController.postFeedContent);
feedRouter.get('/:id?/:page/:perPage?', FeedController.fetchFeedContent);

export default feedRouter;