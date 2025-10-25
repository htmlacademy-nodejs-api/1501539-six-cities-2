import { DocumentType } from '@typegoose/typegoose';
import { CreateCommentRatingDto } from './dto/create-comment-rating.dto.js';
import { CommentRatingEntity } from './comment-rating.entity.js';

export interface CommentRatingService {
  create(dto: CreateCommentRatingDto): Promise<DocumentType<CommentRatingEntity>>;
  findByCommentId(commentId: string): Promise<DocumentType<CommentRatingEntity>[]>
}
