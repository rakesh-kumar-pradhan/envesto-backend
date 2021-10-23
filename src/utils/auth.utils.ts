import { IOtp } from '../interfaces/auth.interface';
import crypto from 'crypto';
import { logger } from '../services/logger.service';
// import fast2sms from '../config/sms.config';
const otpGenerator = require('otp-generator');

const key = process.env.OTP_SECRET as string;

export const generateOtp = (): IOtp => {
    try {
        const otp      = otpGenerator.generate(6, {alphabets: false, upperCase: false, specialChars: false});
        const ttl      = 5 * 60 * 1000; //5 Minutes in miliseconds
        const expires  = Date.now() + ttl; //timestamp to 5 minutes in the future
        const data     = `${otp}.${expires}`; // phone.otp.expiry_timestamp
        const hash     = crypto.createHmac("sha256", key).update(data).digest("hex");
        const fullHash = `${hash}.${expires}`;
        const otpData: IOtp = {otp: otp, token: fullHash};
        return otpData;
    } catch (error) {
        throw error;
    }
}

export const verifyOtp = (data: IOtp) => {
    try {
        const {token, otp} = data;
        let [hashValue, expires] = token.split(".");

        let now = Date.now();
        if(now > parseInt(expires)) return {message: "OTP expired", status: false};

        let newOtp  = `${otp}.${expires}`;
        let newCalculatedHash = crypto.createHmac("sha256", key).update(newOtp).digest("hex");

        if(newCalculatedHash === hashValue){
            return {message: "success", status: true};
        } return {message: "Invalid OTP", status: false};

    } catch (error) {
        throw error;
    }
}

export const sendSms = async (message: string, phone: number) => {
    try {
        const unirest = require("unirest");
        const FAST2SMS_URL = process.env.FAST2SMS_URL;
        const API_KEY = process.env.FAST2SMS_API_KEY;
        const METHOD = process.env.FAST2SMS_METHOD;
        const req = unirest(METHOD, FAST2SMS_URL);

        req.query({
            "authorization": API_KEY,
            "message": message,
            "language": "english",
            "route": "q",
            "numbers": phone,
        });
        req.headers({
            "cache-control": "no-cache"
        });
        req.end(function (res: any) {
            if (res.error) throw new Error(res.error);
            logger.info(res.body);
        });
    } catch (error) {
        throw error;
    }
}