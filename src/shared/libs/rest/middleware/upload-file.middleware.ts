import { Request, Response, NextFunction } from 'express';
import { Middleware } from './middlewate.interface.js';
import multer, { diskStorage } from 'multer';
import { extension } from 'mime-types';
import * as crypto from 'node:crypto';
import { HttpError } from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

export class UploadFileMiddleware implements Middleware {
  constructor(
    private uploadDirectory: string,
    private fieldName: string
  ) {}

  execute(req: Request, res: Response, next: NextFunction): void {
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const storage = diskStorage(
      {
        destination: this.uploadDirectory,
        filename: (_req, file, callback) => {
          const fileExtention = extension(file.mimetype);
          if (typeof fileExtention === 'string' && !allowedExtensions.includes(fileExtention)) {
            throw new HttpError(StatusCodes.BAD_REQUEST, 'Необходимо загрузить изображение в формате jpg, jpeg или png', 'INVALID_FORMAT');
          }
          const fileName = crypto.randomUUID();
          callback(null, `${fileName}.${fileExtention}`);
        }
      }
    );

    const uploadSingleFileMiddleware = multer({storage}).single(this.fieldName);
    uploadSingleFileMiddleware(req, res, next);
  }
}
