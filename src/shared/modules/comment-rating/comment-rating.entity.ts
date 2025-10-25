import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { CommentEntity } from '../comment/index.js';

const required = true;

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentRatingEntity extends defaultClasses.Base {}
@modelOptions({
  schemaOptions: {
    collection: 'comment-rating'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentRatingEntity extends defaultClasses.TimeStamps {
  @prop({
    min: 1,
    max: 5,
    required
  })
  public rating!: number;

  @prop({
    ref: UserEntity,
    required,
  })
  public userId!: Ref<UserEntity>;

  @prop({
    ref: CommentEntity,
    required
  })
  public commentId!: Ref<CommentEntity>;
}

export const CommentRatingModel = getModelForClass(CommentRatingEntity);
