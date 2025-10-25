import { inject, injectable } from 'inversify';
import { CommentService } from './comment-service.interface.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { types, DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CommentRatingService } from '../comment-rating/comment-rating-service.interface.js';
import { ObjectId } from 'mongodb';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.CommentRatingService) private readonly commentRatingService: CommentRatingService
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create({...dto, datePublished: new Date()});
    this.logger.info(`New comment created: ${result.id}`);

    return result.populate(['authorId']);
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel.find({offerId}).populate(['authorId']).exec();
  }

  public async updateRating(id: string, userId: string, rating: number): Promise<DocumentType<CommentEntity> | null> {
    await this.commentRatingService.create({commentId: id, userId, rating});
    const aggregateResult = await this.commentModel.aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        }
      },
      {
        $lookup: {
          from: 'comment-rating',
          let: {
            commentId: '$_id'
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$commentId', '$commentId']
                }
              }
            },
            {
              $project: {rating: 1}
            }
          ],
          as: 'comment-rating'
        }
      },
      {
        $addFields: {
          rating: {
            $round: [
              { $avg: '$comment-rating.rating' },
              1
            ]
          }
        }
      },
      {
        $unset: 'comment-rating'
      }
    ]).exec();
    return aggregateResult?.[0];
  }
}
