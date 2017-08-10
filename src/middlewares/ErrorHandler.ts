import { Request, Response, NextFunction } from "express";
import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from "routing-controllers";
import * as log4js from 'log4js';
const logger = log4js.getLogger('error');

@Middleware({ type: "after" })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
	/**
	 * @param error
	 * @param request
	 * @param response
	 * @param next
	 */
	error(error: any, request: Request, response: Response, next: NextFunction) {
        logger.error(error);
		if (error instanceof HttpError) {
			if (error.httpCode < 500) {
				logger.debug(error.message);
				return next();
			}
        }
        
        logger.error(error);
		next();
	}
}