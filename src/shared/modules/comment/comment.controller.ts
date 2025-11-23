import { inject, injectable } from 'inversify';
import { BaseController, HttpError, HttpMethod, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { CommentService } from './comment-service.interface.js';
import { Response } from 'express';
import { GetCommentsRequest } from './types/get-comments-request.type.js';
import { StatusCodes } from 'http-status-codes';
import { CreateCommentRequest } from './types/create-comment-request.type.js';
import { USER_NOT_AUTHORIZED_ERROR } from '../../libs/rest/errors/user-not-authorized-error.js';
import { fillDTO } from '../../helpers/index.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';

enum CommentPaths {
  Index = '/:offerId',
  Create = '/create'
}

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    this.addRoute({path: CommentPaths.Index, method: HttpMethod.Get, handler: this.index, middlewares: [new ValidateObjectIdMiddleware('offerId')]});
    this.addRoute({path: CommentPaths.Create, method: HttpMethod.Post, handler: this.createComment, middlewares: [new ValidateDtoMiddleware(CreateCommentDto)]});
  }

  public async index({params}: GetCommentsRequest, res: Response) {
    const {offerId} = params;

    if (!offerId) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Необходимо передать параметр offerId', 'OFFER_ID_IS_MISSING');
    }

    const result = await this.commentService.findByOfferId(offerId);
    this.ok(res, fillDTO(CommentRdo, result));
  }

  public async createComment({headers, body}: CreateCommentRequest, res: Response) {
    const isAuthorization = !!headers.authorization;

    if (!isAuthorization) {
      throw USER_NOT_AUTHORIZED_ERROR;
    }

    const result = await this.commentService.create(body);
    this.ok(res, fillDTO(CommentRdo, result));
  }
}
