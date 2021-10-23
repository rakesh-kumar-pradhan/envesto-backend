import { Request, Response } from "express";
import { CREATED, INTERNAL_SERVER_ERROR, CONFLICT, OK } from 'http-status-codes';
import { FeedbackDal } from '../dal/feedback.dal';

const feedBack = new FeedbackDal();

export class FeedbackController {
    public static async postFeedback(req: Request, res: Response) {
        try {
            const data: any = await feedBack.postFeedback(req.body);
            if(data.status) return res.status(CREATED).json(data);
            else return res.status(CONFLICT).json(data);
        } catch (error) {
            return res.status(INTERNAL_SERVER_ERROR).send({error});
        }
    }
    
    public static async fetchFeedback(req: Request, res: Response) {
        try {
            const response: any = await feedBack.fetchFeedbackList(req);
            if(response.status) return res.status(OK).json(response);
            else return res.status(CONFLICT).json(response);
        } catch (error) {
            return res.status(INTERNAL_SERVER_ERROR).send({error});
        }
    }
}