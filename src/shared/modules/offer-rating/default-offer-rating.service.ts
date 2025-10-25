import { inject, injectable } from 'inversify';
import { OfferRatingService } from './offer-rating-service.interface.js';
import { Component } from '../../types/component.enum.js';
import { OfferRatingEntity } from './offer-rating.entity.js';
import { CreateOfferRatingDto } from './dto/create-offer-rating.dto.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types.js';

@injectable()
export class DefaultOfferRatingService implements OfferRatingService {
  constructor(
    @inject(Component.OfferRatingModel) private readonly offerRatingModel: ModelType<OfferRatingEntity>,
    @inject(Component.Logger) private readonly logger: Logger,
  ) {}

  public async create(dto: CreateOfferRatingDto) {
    const existedRating = await this.offerRatingModel.findOne({offerId: dto.offerId, userId: dto.userId});
    if (existedRating) {
      if (existedRating.rating === dto.rating) {
        return existedRating;
      } else {
        await this.offerRatingModel.findByIdAndDelete(existedRating.id);
      }
    }
    const result = await this.offerRatingModel.create(dto);
    this.logger.info(`User: ${dto.userId}, gave a rating ${dto.rating} to offer: ${dto.offerId}`);
    return result;
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<OfferRatingEntity>[]> {
    return this.offerRatingModel.find({offerId}).exec();
  }
}
