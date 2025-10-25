import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';

export interface CommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByOfferId(id: string): Promise<DocumentType<CommentEntity>[]> ;
  updateRating(id: string, userId: string, rating: number): Promise<DocumentType<CommentEntity> | null>;
}
