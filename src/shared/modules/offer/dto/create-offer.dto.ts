import { Coordinates, OfferConvenience, OfferType } from '../../../types/index.js';

export class CreateOfferDto {
  public name!: string;
  public description!: string;
  public datePublished!: Date;
  public city!: string;
  public previewImage!: string;
  public images!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public rating!: number;
  public type!: OfferType;
  public roomsNumber!: number;
  public guestNumber!: number;
  public price!: number;
  public convenience!: OfferConvenience[];
  public authorId!: string;
  public coordinates!: Coordinates;
}
