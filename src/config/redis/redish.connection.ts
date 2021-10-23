import { logger } from '@services/logger.service';
import redis from 'redis';
const asyncRedis = require("async-redis");

const redisClient = redis.createClient(6379);
const asyncRedisClient = asyncRedis.decorate(redisClient)

asyncRedisClient.on('err', (error: any) => {
    logger.error('redish connection error: ' + error);
});

asyncRedisClient.on('connect', () => {
    logger.info('redish connection successfull');
});

asyncRedisClient.on('ready', () => {
    logger.info('redish connection ready');
})

export default asyncRedisClient;