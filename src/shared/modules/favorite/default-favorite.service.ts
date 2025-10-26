import { inject, injectable } from 'inversify';
import { FavoriteService } from './favorite-service.interface.js';
import { Component } from '../../types/component.enum.js';
import { types } from '@typegoose/typegoose';
import { FavoriteEntity } from './favorite.entity.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { ToggleFavoriteDto } from './dto/toggle-favorite.dto.js';

@injectable()
export class DefaultFavoriteService implements FavoriteService {
  constructor(
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>,
    @inject(Component.Logger) private readonly logger: Logger
  ) {}

  public async toggleFavorite(dto: ToggleFavoriteDto): Promise<void> {
    const {offerId, userId} = dto;
    const existedFavorite = await this.favoriteModel.findOne({offerId, userId});
    if (existedFavorite) {
      await this.favoriteModel.findByIdAndDelete(existedFavorite.id);
      this.logger.info(`Offer: ${offerId} deleted from favorite for user: ${userId}`);
    } else {
      await this.favoriteModel.create({
        offerId,
        userId
      });
      this.logger.info(`Offer: ${offerId} add to favorite for user: ${userId}`);
    }
  }

  public async findByUserId(userId: string): Promise<types.DocumentType<FavoriteEntity>[]> {
    return this.favoriteModel.find({userId}).exec();
  }
}
