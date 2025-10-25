import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { OfferEntity } from '../offer/offer.entity.js';

const required = true;

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferRatingEntity extends defaultClasses.Base {}
@modelOptions({
  schemaOptions: {
    collection: 'offer-rating'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferRatingEntity extends defaultClasses.TimeStamps {
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
    ref: OfferEntity,
    required
  })
  public offerId!: Ref<OfferEntity>;
}

export const OfferRatingModel = getModelForClass(OfferRatingEntity);
