import mongoose from "mongoose"
import { logger } from '@services/index';

export const mongoConnect = () => {
    mongoose.connect(process.env.MONGO_URI as string);

    mongoose.connection.on('connected', () => {
        logger.info("Mongoose default connection is open to " + process.env.MONGO_URI);
    })

    mongoose.connection.on('error', (err) => {
        logger.error("Mongoose default connection has occured "+ err +" error");
    })

    mongoose.connection.on('disconnected', (err) => {
        logger.error("Mongoose default connection is disconnected");
    })

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            logger.warn("Mongoose default connection is disconnected due to application termination");
            process.exit(0);
        });
    });
}



