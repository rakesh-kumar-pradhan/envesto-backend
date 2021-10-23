import { Response, Request } from "express";
import { ErrorController } from "./index";

export abstract class AuthController {
    public static async getLogin(req: Request, res: Response) {
        try {
            return res.render('auth/login', {title: 'Login'});
        } catch (error) {
            // return res.status(INTERNAL_SERVER_ERROR).send({error});
            ErrorController.getRequestError(req, res);
        }
    }

    public static async postLogin(req: Request, res: Response) {
        try {
            const session: any = req.session;
            req.session.user = req.body;
            return res.redirect('/admin/dashboard');
        } catch (error) {
            ErrorController.getRequestError(req, res);
        }
    }

    public static async getSignUp(req: Request, res: Response) {
        try {
            return res.render('auth/register', {title: 'Sign Up'});
        } catch (error) {
            ErrorController.getRequestError(req, res);
        }
    }

    public static async onLogout(req: Request, res: Response) {
        try {
            req.session.destroy(err => {
                if(err) res.redirect('/admin/error/404')
                else res.redirect('/admin/auth/login')
            });
        } catch (error) {
            ErrorController.getRequestError(req, res);
        }
    }
}