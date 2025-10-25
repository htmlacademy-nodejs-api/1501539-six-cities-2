import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/component.enum.js';
import { CommentRatingEntity, CommentRatingModel } from './comment-rating.entity.js';
import { CommentRatingService } from './comment-rating-service.interface.js';
import { DefaultCommentRatingService } from './default-comment-rating.service.js';

export const createCommentRatingContainer = (container: Container) => {
  container.bind<types.ModelType<CommentRatingEntity>>(Component.CommentRatingModel).toConstantValue(CommentRatingModel);
  container.bind<CommentRatingService>(Component.CommentRatingService).to(DefaultCommentRatingService).inSingletonScope();
};
