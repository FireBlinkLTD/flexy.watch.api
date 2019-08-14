import * as log4js from "log4js";
import {Request, Response} from "express";
import {Middleware, Req, Res, IMiddleware} from "@tsed/common";

const levels = log4js.levels;
const logger = log4js.getLogger('request-logger');

@Middleware()
export default class RequestLoggerMiddleware implements IMiddleware {
    use(@Req() req: Request, @Res() res: Response): void {
        res.on('finish', () => {
            const url = req.originalUrl || req.url;
            const data = `${req.method} ${res.statusCode} ${url}`;
            let level = levels.INFO;

            if (res.statusCode >= 400) {
              level = levels.WARN;
            }

            if (res.statusCode >= 500) {
              level = levels.ERROR;
            }

            logger.log(level, data);
        });
    }
}
