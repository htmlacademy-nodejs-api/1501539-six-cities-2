import { NextFunction, Request, Response } from 'express';
import { Middleware } from './middlewate.interface.js';
import { Types } from 'mongoose';
import { HttpError } from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

export class ValidateObjectIdMiddleware implements Middleware {
  constructor(private param: string) {}
  execute({params}: Request, _res: Response, next: NextFunction) {
    const objectId = params[this.param];

    if (Types.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new HttpError(StatusCodes.BAD_REQUEST, `Невалидный ObjectId: ${objectId}`, 'INVALID_OBJECTID');
  }
}
