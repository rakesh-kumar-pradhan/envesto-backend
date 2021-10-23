import { Response, Request } from "express";
import { ErrorController } from './error.controller';

export abstract class DashboardController {
    public static async getDashboard(req: Request, res: Response) {
        try {
            const session: any = req.session;
            if(session.user)
                return res.render('dashboard', {user: session.user, title: "Dashboard"});
            else
            return res.redirect('admin/error/404');
        } catch (error) {
            ErrorController.getRequestError(req, res);
        }
    }
}