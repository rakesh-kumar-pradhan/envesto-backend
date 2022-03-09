// import db from '@config/db/sql.db';
import { statSync } from 'fs';
import { join } from 'path';
import { RedisService } from '../services/redish.service';
import { ISignUpUser, IRequest, IAdminLogin, ILoggedInUser } from '@interfaces/index';
import { Users } from '../models/index';
import { generateOtp, verifyOtp, sendSms } from '../utils/auth.utils';
import { logger } from '../services/logger.service';
import { IOtp } from '../interfaces/auth.interface';
import { verifyOtpToken, generateToken } from '../services/jwt.service';

export class AuthDal {
    //  private rds = new RedisService();

    constructor() { }

    public async onSignUp(data: IRequest) {
        return new Promise(async (resolve, reject) => {
            try {
                
                const userData: ISignUpUser = data.body!;

                const isEmailExist = await Users.findOne({email: userData.email});
                if(isEmailExist) return resolve({message: "Email already exist", status: false});

                const isPhoneExist = await Users.findOne({phone: userData.phone});
                if(isPhoneExist) return resolve({message: "Mobile already exist", status: false});

                const newUser = new Users(userData);
                const saveUser = await newUser.save();
                return resolve({user: saveUser, status: true});
                // let list: any = await this.rds.getUser();
                // if(list) return resolve({list, "redis": "redis"});
                // else {
                //     list = await db.execute('select * from users');
                //     await this.rds.setUser({list, db: "db"});
                //     return resolve(list)
                // }
            } catch (error: any) {
                return reject(error.errors);
            }  
        })
    }

    public async onLoginWithPhoneOtp(data: any) {
        return new Promise(async (resolve, reject) => {
            try {
                const {phone} = data;
                let user;
                console.log(phone);
                const isUserExist = await Users.findOne({phone: phone});
                if(isUserExist) {
                    user = isUserExist;
                }
                 else {
                    const newUser = new Users({phone});
                    user = await newUser.save();
                }
                const {otp, token} = generateOtp(phone);
                resolve({otp, token, status: true, message: "OTP sent to registered phone number"});
                
                const message = `${otp} is your one time password. It is valid for 5 min. Do not share your OTP with anyone`;
                // await sendSms(message, phone);

            } catch (error: any) {
                console.log(error);
                return reject(error);
            }  
        })
    }

    public async onVerifyOtp(data: IOtp) {
        return new Promise(async (resolve, reject) => {
            try {
                const isOtpValid = await verifyOtpToken(data);
                if(isOtpValid.status) {
                    const phone = isOtpValid.data.phone;
                    const userDetails: any = await Users.findOne({phone: phone}).select('_id phone role email');
                    const payload = {_id: userDetails._id, phone: userDetails.phone, role: userDetails.role};
                    const token = generateToken(payload);
                    return resolve({token, userDetails, status: true});
                } else return resolve(isOtpValid);
            } catch (error: any) {
                return reject(error);
            }  
        })
    }

    public async onSignIn(data: IAdminLogin) {
        return new Promise(async (resolve, reject) => {
            try {
               let {email, password} = data;
                const isEmailExist = await Users.findOne({email: email});
                if(isEmailExist) {
                    const userDetails: any = await Users.findOne({email:email,password:password}).select('_id phone role email');
                    if(userDetails) {
                    const payload = {_id: userDetails._id, phone: userDetails.phone, role: userDetails.role};
                    const token = generateToken(payload);
                    return resolve({token, userDetails, status: true});
                    }else{
                        return resolve({status: false,messsage:"Invalid password"});
                    }
                }

                // if(isPhoneExist) return resolve({message: "Mobile already exist", status: false});

                // const newUser = new Users(userData);
                // const saveUser = await newUser.save();
            } catch (error: any) {
                return reject(error.errors);
            }  
        })
    }

    public async getVideo(params: any) {
        return new Promise(async (resolve, reject) => {
            try {
                const range: any = params.range || '3000';
                const videoPath = join(__dirname, '/../../public/uploads/sample.mp4');
                const videoSize = statSync(videoPath).size;
                
                const CHUNK_SIZE = 10 ** 6; // 1MB
                const start = Number(range.replace(/\D/g, ""));
                const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

                const contentLength = end - start + 1;
                const headers = {
                    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": contentLength,
                    "Content-Type": "video/mp4",
                };

                return resolve({headers, start, end, videoPath});
            } catch (error) {
                return reject(error);
            }  
        })
    }
}