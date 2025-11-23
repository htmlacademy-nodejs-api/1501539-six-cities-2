import { Request, Response, NextFunction } from 'express';
import { Middleware } from './middlewate.interface.js';
import multer, { diskStorage } from 'multer';
import { extension } from 'mime-types';
import * as crypto from 'node:crypto';

export class UploadFileMiddleware implements Middleware {
  constructor(
    private uploadDirectory: string,
    private fieldName: string
  ) {}

  execute(req: Request, res: Response, next: NextFunction): void {
    const storage = diskStorage(
      {
        destination: this.uploadDirectory,
        filename: (_req, file, callback) => {
          const fileExtention = extension(file.mimetype);
          const fileName = crypto.randomUUID();
          callback(null, `${fileName}.${fileExtention}`);
        }
      }
    );

    const uploadSingleFileMiddleware = multer({storage}).single(this.fieldName);
    uploadSingleFileMiddleware(req, res, next);
  }
}
