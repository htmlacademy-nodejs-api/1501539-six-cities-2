import { Container } from 'inversify';
import { OfferRatingEntity, OfferRatingModel } from './offer-rating.entity.js';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/component.enum.js';
import { DefaultOfferRatingService } from './default-offer-rating.service.js';
import { OfferRatingService } from './offer-rating-service.interface.js';

export const createOfferRatingContainer = (container: Container) => {
  container.bind<types.ModelType<OfferRatingEntity>>(Component.OfferRatingModel).toConstantValue(OfferRatingModel);
  container.bind<OfferRatingService>(Component.OfferRatingService).to(DefaultOfferRatingService).inSingletonScope();
};
