import { FeedbackController } from "../../controllers/index";
import { Router } from "express";

const feedbackRouter = Router();

feedbackRouter.post('/', FeedbackController.postFeedback);
feedbackRouter.get('/:page/:perPage?', FeedbackController.fetchFeedback);

export default feedbackRouter;