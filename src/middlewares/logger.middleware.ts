import expressPinoLogger from 'express-pino-logger';
import {logger} from '@services/index';

export const loggerMidlleware = expressPinoLogger({
    logger: logger,
    autoLogging: true
});