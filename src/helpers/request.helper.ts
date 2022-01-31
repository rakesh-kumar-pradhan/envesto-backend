import { Request } from "express";

export const getUserFromRequest = (req: Request) => {
    const myReq = req as any;
    return myReq.user;
}