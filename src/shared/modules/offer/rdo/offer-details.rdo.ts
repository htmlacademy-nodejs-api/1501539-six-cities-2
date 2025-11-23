import { Expose, Type } from 'class-transformer';
import { OfferConvenience, OfferType } from '../../../types/offer.interface.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

class Coordinates {
  @Expose()
  public latitude!: number;

  @Expose()
  public longitude!: number;
}

export class OfferDetailsRdo {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public description!: string;

  @Expose()
  public datePublished!: string;

  @Expose()
  public city!: string;

  @Expose()
  public previewImage!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: OfferType;

  @Expose()
  public roomsNumber!: number;

  @Expose()
  public guestNumber!: number;

  @Expose()
  public price!: number;

  @Expose()
  public convience!: OfferConvenience[];

  @Expose({name: 'authorId'})
  @Type(() => UserRdo)
  public author!: UserRdo;

  @Expose()
  @Type(() => Coordinates)
  public coordinates!: Coordinates;

  @Expose()
  public commentsNumber!: number;
}
