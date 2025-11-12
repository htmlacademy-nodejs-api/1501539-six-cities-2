import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { Component } from '../../types/component.enum.js';
import { OfferService } from './offer-service.interface.js';
import { DefaultOfferService } from './default-offer.service.js';
import { Controller } from '../../libs/rest/index.js';
import { OfferController } from './offer.controller.js';

export const createOfferContainer = (container: Container) => {
  container.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  container.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
  container.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();
};
