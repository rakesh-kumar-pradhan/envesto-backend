import { requireLoginWeb } from "@middlewares/index";
import { Router } from "express";
import { DashboardController } from "../../app/controllers/index";

const dashboardRouter = Router();
dashboardRouter.use(requireLoginWeb);

dashboardRouter.get('/dashboard', DashboardController.getDashboard);

export default dashboardRouter;