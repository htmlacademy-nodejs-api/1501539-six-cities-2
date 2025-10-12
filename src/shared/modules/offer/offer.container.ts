import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { Component } from '../../types/component.enum.js';
import { OfferService } from './offer-service.interface.js';
import { DefaultOfferService } from './default-offer.service.js';

export const createOfferContainer = (container: Container) => {
  container.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  container.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
};
