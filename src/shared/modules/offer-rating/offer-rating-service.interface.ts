import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferRatingDto } from './dto/create-offer-rating.dto.js';
import { OfferRatingEntity } from './offer-rating.entity.js';

export interface OfferRatingService {
  create(dto: CreateOfferRatingDto): Promise<DocumentType<OfferRatingEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<OfferRatingEntity>[]>
}
