import { NextFunction, Request, Response } from "express";

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