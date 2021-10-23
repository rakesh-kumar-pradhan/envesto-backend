import { Response, Request } from "express";
import { INTERNAL_SERVER_ERROR, OK } from "http-status-codes";

export abstract class ErrorController {
    public static async getPageNotFound(req: Request, res: Response) {
        try {
            return res.render('error/error-404');
        } catch (error) {
            return res.status(INTERNAL_SERVER_ERROR).send({error});
        }
    }

    public static async getRequestError(req: Request, res: Response) {
        try {
            return res.render('error/error-400');
        } catch (error) {
            return res.status(INTERNAL_SERVER_ERROR).send({error});
        }
    }
}