import { Expose } from 'class-transformer';

export class OfferRdo {
  @Expose()
  public id!: string;

  @Expose()
  public price!: number;

  @Expose()
  public name!: string;

  @Expose()
  public type!: string;

  @Expose()
  public isFavorite!: string;

  @Expose()
  public datePublished!: string;

  @Expose()
  public city!: string;

  @Expose()
  public previewImage!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public commentsNumber!: number;
}
