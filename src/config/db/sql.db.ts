import { Connection } from 'mysql2';
import {createPool} from 'mysql2/promise';
import { IDatabaseConObj } from '@interfaces/index';
import {logger} from '@services/index';

export default class SqlDatabaseConnection {
    private static pool: any;
    constructor() {
    }

    public static async main() {
        try {
            const connectionObj: IDatabaseConObj = {
                host: process.env.HOST as string ,
                user: process.env.USER,
                password: process.env.PASSWORD as string,
                database: process.env.DATABASE as string,
                connectionLimit: process.env.CONNECTION_LIMIT,
                queueLimit: process.env.QUEUE_LIMIT
            }
            this.pool = await createPool(connectionObj);

            this.pool.on('connection', (connection: Connection) => {
                logger.info('DB Connection established');
                connection.on('error', (err: any) => {
                    logger.error(err, true);
                });
                connection.on('close', (err: any) => {
                    logger.info(err, true);
                });
            });
            // return this.pool;

        } catch (error: any) {
            logger.error(error.message);
            return Promise.reject(error.message);
        }
    }

    public static async execute(query: string, param?: any) {
        try {
            const conn: Connection = await this.sqlConnection();
            const data: any = await conn.execute(query, param);
            return Promise.resolve(data[0]);
        } catch (error: any) {
            logger.error(error, true);
            return Promise.reject(error.sqlMessage);
        }
    }

    private static async sqlConnection() {
        await this.main();
        return this.pool;
    }
}