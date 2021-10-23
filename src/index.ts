import 'module-alias/register';
require('custom-env').env('staging', './env');
import { RestServer } from './server';
import { mongoConnect } from '@config/db/mongo.db';
// const ports = [3009, 3001, 3002, 3003];
const servers = [];

// ports.forEach((port: any) => {
//     servers.push(new RestServer().startServer(port, process.env.ENV))
// })
new RestServer().startServer(process.env.PORT, process.env.ENV)
mongoConnect();
