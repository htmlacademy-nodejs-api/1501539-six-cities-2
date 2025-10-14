import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { OfferEntity } from '../offer/offer.entity.js';

const required = true;

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}
@modelOptions({
  schemaOptions: {
    collection: 'comments',
    timestamps: true
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ required, minlength: [5, 'Min length for text 5'], maxlength: [1024, 'Max length for text 1024'] })
  public text!: string;

  @prop({ required })
  public datePublished!: Date;

  @prop({ required, min: [1, 'Min rating 1'], max: [5, 'Max rating 5'] })
  public rating!: number;

  @prop({ ref: UserEntity, required })
  public authorId!: Ref<UserEntity>;

  @prop({ ref: OfferEntity, required })
  public offerId!: Ref<OfferEntity>;
}

export const CommentModule = getModelForClass(CommentEntity);
