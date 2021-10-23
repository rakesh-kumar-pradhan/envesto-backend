import { Request } from "express";
import { uuid } from 'uuidv4';

const oneDay = 1000 * 60 * 60 * 24;

const sessionData =  {
    secret: process.env.SECRET as string,
    saveUninitialized: true,
    cookie: {
        genid: function(req: Request) {
            return uuid();
        },
        maxAge: oneDay, 
        secure: process.env.ENV == 'production' ? true : false, 
        httpOnly: true, 
        sameSite: true,
        proxy: true
    },
    resave: false
}

export default sessionData;