import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/rest.application.js';
import { Component } from './shared/types/component.enum.js';
import { createRestApplicationContainer } from './rest/index.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createOfferContainer } from './shared/modules/offer/index.js';
import { createCommentContainer } from './shared/modules/comment/index.js';
import { createOfferRatingContainer } from './shared/modules/offer-rating/index.js';
import { createCommentRatingContainer } from './shared/modules/comment-rating/index.js';

const bootstrap = async () => {
  const appContainer = new Container;
  createRestApplicationContainer(appContainer);
  createUserContainer(appContainer);
  createOfferContainer(appContainer);
  createCommentContainer(appContainer);
  createOfferRatingContainer(appContainer);
  createCommentRatingContainer(appContainer);

  const application = appContainer.get<RestApplication>(Component.RestApplication);

  await application.init();
};

bootstrap();
