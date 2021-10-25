import { sign, SignOptions, verify, VerifyOptions } from "jsonwebtoken";
import { IOtp } from '../interfaces/auth.interface';

export const generateToken = (payload: any) => {
    // SIGNING OPTIONS
    const signOptions: SignOptions = {
        issuer: process.env.ISSUER as string,
        expiresIn: process.env.EXPIRES_IN as string,
        jwtid: process.env.JWT_ID as string,
      };
  
      //Token generation
      const secret = process.env.JWT_SECRET as string;
      let token = sign(payload, secret, signOptions);
      return `Bearer ${token}`;
};

export const verifyToken = async (token: string) => {
    try {
        // VERIFY OPTIONS
        const verifyOptions: VerifyOptions = {
            issuer: process.env.ISSUER as string,
            // expiresIn: process.env.EXPIRES_IN as string,
            jwtid: process.env.JWT_ID as string,
        };

        const secret = process.env.JWT_SECRET as string;
        const tokenUser = await verify(token, secret, verifyOptions);
        if(!tokenUser) {
            return {status: false, error: 'Unauthorised user'};
        }
        return token;
    } catch (error) {
        throw new Error('Invalid token');
    }
}

export const generateOtpToken = (phone: string, otp: string): string => {
      const secret = process.env.JWT_SECRET as string;
      const ttl      = 5 * 60 * 1000; //5 Minutes in miliseconds
      const expires  = Date.now() + ttl; //timestamp to 5 minutes in the future
      const payload = {phone, otp, expires};
      let token = sign(payload, secret);
      return token;
}

export const verifyOtpToken = async (data: IOtp) => {
    try {
        const {otp, token} = data;
        const secret = process.env.JWT_SECRET as string;
        const tokenUser: any = await verify(token, secret);
        if(tokenUser && tokenUser.otp === otp) {
            let now = Date.now();
            if(now > parseInt(tokenUser.expires)) return {message: "OTP expired", status: false};
            return {message: "success", data: tokenUser, status: true};
        } return {message: "Invalid OTP", status: false};
    } catch (error) {
        throw new Error('Invalid token');
    }
}