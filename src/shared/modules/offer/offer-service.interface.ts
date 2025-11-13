import { CreateOfferDto } from './dto/create-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { CitiesName } from '../../types/cities-name.enum.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(id: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(id: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(id: string): Promise<void>;
  find(pageSize: number, page: number): Promise<DocumentType<OfferEntity>[]>;
  findPremiumByCity(city: CitiesName): Promise<DocumentType<OfferEntity>[]>;
  findFavoriteOffersForUser(userId: string): Promise<DocumentType<OfferEntity>[]>;
  incCommentCount(id:string): Promise<DocumentType<OfferEntity> | null>;
  updateRating(id: string): Promise<DocumentType<OfferEntity> | null>;
}
