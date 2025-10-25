import { DocumentType, types } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferService } from './offer-service.interface.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { CitiesName } from '../../types/cities-name.enum.js';
import { OfferRatingService } from '../offer-rating/index.js';
import { ObjectId } from 'mongodb';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.OfferRatingService) private readonly offerRatingService: OfferRatingService,
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created, offerId: ${result.name}`);

    return result;
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(id).populate(['authorId']).exec();
  }

  public async updateById(id: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(id, dto, {new:true})
      .populate(['authorId'])
      .exec();
  }

  public async deleteById(id: string): Promise<void> {
    this.offerModel.findByIdAndDelete(id).exec();
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find().populate(['authorId']).exec();
  }

  public async findPremiumByCity(city: CitiesName, limit: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({isPremium: true, city}).limit(limit).populate(['authorId']).exec();
  }

  public async findFavorite(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({isFavorite: true}).populate(['authorId']).exec();
  }

  public async favoriteToggle(id:string, isFavorite: boolean): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(id, {isFavorite}, {new:true}).populate(['authorId']).exec();
  }

  public async incCommentCount(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(id, {
      $inc: {
        commentsNumber: 1
      }
    }).exec();
  }

  public async updateRating(id: string, userId: string, rating: number): Promise<DocumentType<OfferEntity> | null> {
    await this.offerRatingService.create({offerId: id, userId, rating});
    const aggregateResult = await this.offerModel.aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        }
      },
      {
        $lookup: {
          from: 'offer-rating',
          let: {
            offerId: '$_id'
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$offerId', '$offerId']
                }
              }
            },
            {
              $project: {rating: 1}
            }
          ],
          as: 'offer-rating'
        }
      },
      {
        $addFields: {
          rating: {
            $round: [
              { $avg: '$offer-rating.rating' },
              1
            ]
          }
        }
      },
      {
        $unset: 'offer-rating'
      }
    ]).exec();
    return aggregateResult?.[0];
  }
}
