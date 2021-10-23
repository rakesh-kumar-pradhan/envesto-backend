import express, { Application, json, NextFunction, Request, Response, urlencoded } from "express";
import helmet from 'helmet';
import { IError } from '@interfaces/index';
import {BAD_REQUEST, getReasonPhrase, NOT_FOUND} from 'http-status-codes';
import { createWriteStream } from "fs";
import { join } from "path";
import morgan from "morgan";
import {loggerMidlleware} from "@middlewares/index";
import {logger} from '@services/index';
import apiRouter from "./routes/api/index";
import cors, { CorsOptions } from "cors";
import webRouter from './routes/web/index';
import session from "express-session";
import sessionData from "./config/session/session.config";
import cookieParser from "cookie-parser";

export class RestServer {
    private _app: Application;
    private readonly corsOptions: CorsOptions = {
        allowedHeaders: [
          'Origin',
          'X-Requested-With',
          'Content-Type',
          'Accept',
          'x-access-token',
          'device',
          'pannel',
        ],
        methods: 'GET,HEAD,OPTIONS,PUT,POST,DELETE',
        origin: '*',
        preflightContinue: false,
      };
    private engine = require('ejs-locals');

    constructor() {
        this._app = express();
        this.init();
    }

    private init() {
        /** Log generate */
        this.logGenerate();

        this._app.use(json());
        this._app.use(urlencoded({extended: true, limit: "10mb"}));
        this._app.use(cors(this.corsOptions));
        this._app.use(helmet());

        /** Logger Middleware */
        // this._app.use(loggerMidlleware);

        /** Public directory path*/
        this._app.use(express.static(join(__dirname, '/../public')));

        /** Setting views */
        this._app.set('views', join(__dirname, '/app/views'))
        this._app.engine('ejs', this.engine);
        this._app.set('view engine', 'ejs');

        /**Session and Cookie management */
        if(process.env.ENV == 'production') {
          this._app.set('trust proxy', 1);
        }
        this._app.use(session(sessionData));
        this._app.use(cookieParser());

        /**Setting locals to access in view */
        this._app.use(function(req: Request, res: Response, next: NextFunction) {
          res.locals.user = req.session.user?.email;
          next();
        });

        /** Setting API path for api and web admin */
        this._app.use('/api', apiRouter);
        this._app.use('/admin', webRouter);

         /** Handling error */
        this._app.use(this.routeNotFoundError.bind(this));
        this._app.use(this.errorHandler);
    }

    private routeNotFoundError(req: Request, res: Response, next: NextFunction) {
        return res.status(NOT_FOUND).send({
          status: false,
          error: getReasonPhrase(NOT_FOUND),
          message: `${req.method} ${req.url} route not found`,
        });
      }
    
      private errorHandler(error: Error, req: Request, res: Response) {
        return res.send(BAD_REQUEST).send({ error: error });
      }

    private handleError(req: Request, res: Response, next: NextFunction) {
        this._app.use((req: Request, res: Response, next: NextFunction) => {
            const error: any = new Error('NOT_FOUND');
            error.status = NOT_FOUND;
            next(error);
        });
        this._app.use((error: IError, req: Request, res: Response) => {
            return res.status(error.status || BAD_REQUEST).send({message: error.message || 'BAD_REQUEST'});
        })
    }

    private logGenerate() {
        const curDate = new Date();
        const logFileName = `${curDate.getMonth()-1}_${curDate.getDate()}_${curDate.getFullYear()}`;
        const logStream = createWriteStream(join(__dirname, `/../log/${logFileName}.log`), {flags: 'a'});
        this._app.use(morgan('combined', {stream: logStream}));
    }

    public startServer(PORT: string | undefined, ENV: string | undefined) {
        this._app.listen(PORT, () => {
            logger.info('server is running on PORT: ' + PORT + '\n Environment: ' + ENV)
        });
    }
}