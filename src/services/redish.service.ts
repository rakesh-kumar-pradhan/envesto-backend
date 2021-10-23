// import  redisClient  from "@config/redish.connection";
// import { IUser } from "@interfaces/index";
import redis from 'redis';
const asyncRedis = require("async-redis");

const redisClient = redis.createClient(6379);
const asyncRedisClient = asyncRedis.decorate(redisClient)

export class RedisService {
    public async getUser() {
        return new Promise( async(resolve, reject) => {
            try {
                const list = await asyncRedisClient.get('user');
                return resolve(JSON.parse(list));
                } catch (error) {
                    return reject(error);
                }  
        })
    }

    public async setUser(user: any) {
        try {
            asyncRedisClient.setex('user', 600, JSON.stringify(user));
            return Promise.resolve(true);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}