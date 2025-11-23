import { Request, Response, NextFunction } from 'express';
import { DocumentExist } from '../../../types/document-exist.interface.js';
import { Middleware } from './middlewate.interface.js';
import { HttpError } from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

export class DocumentExistMiddleware implements Middleware {
  constructor(
    private readonly service: DocumentExist,
    private readonly entityName: string,
    private readonly paramName: string
  ) {}

  public async execute({params}: Request, _res: Response, next: NextFunction): Promise<void> {
    const documentId = params[this.paramName];
    if (!await this.service.exists(documentId)) {
      throw new HttpError(StatusCodes.NOT_FOUND, `${this.entityName} с таким ${this.paramName} не найден`, 'DOCUMENT_NOT_FOUND');
    }

    next();
  }
}
