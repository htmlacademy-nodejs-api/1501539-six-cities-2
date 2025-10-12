import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';

export interface CommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findById(id:string): Promise<DocumentType<CommentEntity>> | null;
  findByAuthorId(id: string): Promise<DocumentType<CommentEntity>[] | []> ;
  findByOfferId(id: string): Promise<DocumentType<CommentEntity>[] | []> ;
  findByRating(rating: number): Promise<DocumentType<CommentEntity>[] | []> ;
}
