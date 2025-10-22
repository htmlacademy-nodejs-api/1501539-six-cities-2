import { inject, injectable } from 'inversify';
import { CommentService } from './comment-service.interface.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { types, DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModule) private readonly commentModule: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModule.create(dto);
    this.logger.info(`New comment created: ${result.id}`);

    return result.populate('authorId');
  }

  public async findById(id: string): Promise<DocumentType<CommentEntity> | null> {
    return this.commentModule.findById(id).populate('authorId').exec();
  }

  public async findByAuthorId(authorId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModule.find({authorId}).populate('authorId').exec();
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModule.find({offerId}).populate('authorId').exec();
  }

  public async findByRating(rating: number): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModule.find({rating}).populate('authorId').exec();
  }
}
