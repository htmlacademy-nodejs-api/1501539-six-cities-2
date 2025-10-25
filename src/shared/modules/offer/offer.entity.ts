import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { OfferConvenience, OfferType } from '../../types/offer.interface.js';
import { CitiesName } from '../../types/index.js';
import { UserEntity } from '../user/user.entity.js';

const trim = true;
const required = true;
const IMAGES_MAX_LENGTH = 6;

class Coordinates {
  @prop({ required })
  public latitude!: number;

  @prop({ required })
  public longitude!: number;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}
@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    trim,
    required,
    minlength: [10, 'Min length for name 10'],
    maxlength: [100, 'Max length for name 100']
  })
  public name!: string;

  @prop({
    trim,
    required,
    minlength: [20, 'Min length for description 20'],
    maxlength: [1024, 'Max length for description 1024']
  })
  public description!: string;

  @prop({ required })
  public datePublished!: Date;

  @prop({
    required,
    enum: CitiesName,
    type: () => String
  })
  public city!: string;

  @prop({ required })
  public previewImage!: string;

  @prop({
    required,
    type: () => [String],
    validate: {
      validator: (images: string[]) => images.length === IMAGES_MAX_LENGTH,
      message: 'Images list length can be only 6'
    },
  })
  public images!: string[];

  @prop({ required })
  public isPremium!: boolean;

  @prop({ required })
  public isFavorite!: boolean;

  @prop({
    min: [1, 'Min rating 1'],
    max: [5, 'Max rating 5'],
    default: 0
  })
  public rating!: number;

  @prop({
    type: () => String,
    enum: OfferType,
    required
  })
  public type!: OfferType;

  @prop({
    required,
    min: [1, 'Min rooms 1'],
    max: [8, 'Max rooms 8']
  })
  public roomsNumber!: number;

  @prop({
    required,
    min: [1, 'Min guests 1'],
    max: [10, 'Max gooests 10']
  })
  public guestNumber!: number;

  @prop({
    required,
    min: [100, 'Min price 100'],
    max: [100000, 'Max price 100 000']
  })
  public price!: number;

  @prop({
    required,
    type: () => [String],
    enum: OfferConvenience
  })
  public convenience!: OfferConvenience[];

  @prop({
    ref: UserEntity,
    required
  })
  public authorId!: Ref<UserEntity>;

  @prop()
  public commentsNumber!: number;

  @prop({ required, _id: false })
  public coordinates!: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
