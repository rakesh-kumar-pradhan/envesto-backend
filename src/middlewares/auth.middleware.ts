import { NextFunction, Request, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { verifyToken } from "../services";

declare module 'express-session' {
    export interface SessionData {
      user: { [key: string]: any };
    }
}

export const requireLoginWeb = (req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.session && !req.session.user) {
            return res.redirect('auth/login');
        } else {
            next();
        }
    } catch (error) {
        return res.redirect('admin/error/404');
    }
}

export const verifyUserToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if(bearerHeader) {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            const result = await verifyToken(bearerToken);
            if(result.status) {
                const myReq: any = (req as any) as any;
                myReq['user'] = result.user;
                next();
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).send({
                    status: false,
                    error: getReasonPhrase(StatusCodes.UNAUTHORIZED),
                  });
            }
        } else {
            return res.status(StatusCodes.FORBIDDEN).send({
                status: false,
                error: getReasonPhrase(StatusCodes.FORBIDDEN),
            });
        }
    } catch (error) {
        console.log(error);
        throw new Error('something went wrong');
    }
}