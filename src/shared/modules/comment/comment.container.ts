import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { CommentEntity, CommentModule } from './comment.entity.js';
import { Component } from '../../types/component.enum.js';
import { CommentService } from './comment-service.interface.js';
import { DefaultCommentService } from './default-comment.service.js';

export const createCommentContainer = (container: Container) => {
  container.bind<types.ModelType<CommentEntity>>(Component.CommentModule).toConstantValue(CommentModule);
  container.bind<CommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
};
