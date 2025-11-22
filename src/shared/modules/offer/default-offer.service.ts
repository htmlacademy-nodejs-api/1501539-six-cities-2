import { DocumentType, types } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferService } from './offer-service.interface.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { CitiesName } from '../../types/cities-name.enum.js';
import { ObjectId } from 'mongodb';
import { FavoriteService } from '../favorite/index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.FavoriteService) private readonly favoriteService: FavoriteService,
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created, offerId: ${result.name}`);

    return result.populate(['authorId']);
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

  public async find(pageSize: number, page: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find().populate(['authorId']).skip((page - 1) * pageSize).limit(pageSize).exec();
  }

  public async findPremiumByCity(city: CitiesName): Promise<DocumentType<OfferEntity>[]> {
    const limit = 3;
    return this.offerModel.find({isPremium: true, city}).limit(limit).populate(['authorId']).exec();
  }

  public async findFavoriteOffersForUser(userId: string): Promise<DocumentType<OfferEntity>[]> {
    const favoritesByUserId = await this.favoriteService.findByUserId(userId);
    const favoriteOffers = await this.offerModel.find({
      _id: [...favoritesByUserId.map((favorite) => favorite.offerId)]
    });
    return favoriteOffers;
  }

  public async incCommentCount(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(id, {
      $inc: {
        commentsNumber: 1
      }
    }).exec();
  }

  public async updateRating(id: string): Promise<DocumentType<OfferEntity> | null> {
    const aggregateResult = await this.offerModel.aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        }
      },
      {
        $lookup: {
          from: 'comments',
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
          as: 'comments'
        }
      },
      {
        $addFields: {
          rating: {
            $round: [
              { $avg: '$comments.rating' },
              1
            ]
          }
        }
      },
      {
        $unset: 'comments'
      },
    ]).exec();
    this.logger.info(`aggregeteResult: ${JSON.stringify(aggregateResult?.[0])}`);
    const newRating = aggregateResult?.[0]?.rating;

    if (newRating !== undefined) {
      await this.offerModel.updateOne({
        _id: new ObjectId(id)
      },
      {
        rating: newRating
      });
    }

    return aggregateResult?.[0];
  }

  public async exists(documentId: string): Promise<boolean> {
    return Boolean(await this.offerModel.findById(documentId));
  }
}
