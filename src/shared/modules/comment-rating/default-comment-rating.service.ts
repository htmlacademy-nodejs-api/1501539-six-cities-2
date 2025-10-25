import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types.js';
import { CommentRatingService } from './comment-rating-service.interface.js';
import { CommentRatingEntity } from './comment-rating.entity.js';
import { CreateCommentRatingDto } from './dto/create-comment-rating.dto.js';

@injectable()
export class DefaultCommentRatingService implements CommentRatingService {
  constructor(
    @inject(Component.CommentRatingModel) private readonly commentRatingModel: ModelType<CommentRatingEntity>,
    @inject(Component.Logger) private readonly logger: Logger,
  ) {}

  public async create(dto: CreateCommentRatingDto) {
    const existedRating = await this.commentRatingModel.findOne({commentId: dto.commentId, userId: dto.userId});
    if (existedRating) {
      if (existedRating.rating === dto.rating) {
        return existedRating;
      } else {
        await this.commentRatingModel.findByIdAndDelete(existedRating.id);
      }
    }
    const result = await this.commentRatingModel.create(dto);
    this.logger.info(`User: ${dto.userId}, gave a rating ${dto.rating} to comment: ${dto.commentId}`);
    return result;
  }

  public async findByCommentId(commentId: string): Promise<DocumentType<CommentRatingEntity>[]> {
    return this.commentRatingModel.find({commentId}).exec();
  }
}
