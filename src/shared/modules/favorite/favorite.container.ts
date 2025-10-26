import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { FavoriteEntity, FavoriteModel } from './favorite.entity.js';
import { Component } from '../../types/component.enum.js';
import { FavoriteService } from './favorite-service.interface.js';
import { DefaultFavoriteService } from './default-favorite.service.js';

export const createFavoriteContainer = (container: Container) => {
  container.bind<types.ModelType<FavoriteEntity>>(Component.FavoriteModel).toConstantValue(FavoriteModel);
  container.bind<FavoriteService>(Component.FavoriteService).to(DefaultFavoriteService).inSingletonScope();
};

