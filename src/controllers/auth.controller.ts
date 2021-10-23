import { Response, Request } from "express";
import { AuthDal } from "../dal/auth.dal";
import { CREATED, INTERNAL_SERVER_ERROR, OK, CONFLICT} from "http-status-codes";
import { logger } from '@services/index';
import { createReadStream } from "fs";
import { IRequest } from '../interfaces/request.interface';

const authDal = new AuthDal()

export abstract class AuthController {

    public static async onSignUp(req: Request, res: Response) {
        try {
            const data: IRequest = req;
            const response: any = await authDal.onSignUp(data);
            if(response.status)
                return res.status(CREATED).send({response});
            else return res.status(CONFLICT).send({response});
        } catch (error) {
            return res.status(INTERNAL_SERVER_ERROR).send({error});
        }
    }

    public static async onLoginWithPhoneOtp(req: Request, res: Response) {
        try {
            const response: any = await authDal.onLoginWithPhoneOtp(req.body);
            if(response.status) {
                return res.status(OK).send({response});
            } else return res.status(OK).send({response});
        } catch (error) {
            return res.status(INTERNAL_SERVER_ERROR).send({error});
        }
    }

    public static async onVerifyOtp(req: Request, res: Response) {
        try {
            const response: any = await authDal.onVerifyOtp(req.body);
            if(response.status) {
                return res.status(OK).send({response});
            }
            else return res.status(CONFLICT).send({response});
        } catch (error) {
            return res.status(INTERNAL_SERVER_ERROR).send({error});
        }
    }

    public static async onSignIn(req: Request, res: Response) {
        try {
            const response: any = await authDal.onSignIn(req.body);
            if(response.status)
                return res.status(CREATED).send({response});
            else return res.status(CONFLICT).send({response});
        } catch (error) {
            return res.status(INTERNAL_SERVER_ERROR).send({error});
        }
    }

    public static async getVideo(req: Request, res: Response) {
        try {
            const data: any = await authDal.getVideo(req.headers);
            const start = data.start;
            const end = data.end;

            res.writeHead(206, data.headers);
            const videoStream = createReadStream(data.videoPath, { start, end });
            videoStream.pipe(res);

            // return res.status(OK).send({data: data});
        } catch (error) {
            console.log(error);
            return res.status(INTERNAL_SERVER_ERROR).send({error});
        }
    }
}