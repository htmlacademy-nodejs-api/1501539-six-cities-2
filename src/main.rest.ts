import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/rest.application.js';
import { Component } from './shared/types/component.enum.js';
import { createRestApplicationContainer } from './rest/index.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createOfferContainer } from './shared/modules/offer/index.js';
import { createCommentContainer } from './shared/modules/comment/index.js';
import { createFavoriteContainer } from './shared/modules/favorite/favorite.container.js';

const bootstrap = async () => {
  const appContainer = new Container;
  createRestApplicationContainer(appContainer);
  createUserContainer(appContainer);
  createOfferContainer(appContainer);
  createCommentContainer(appContainer);
  createFavoriteContainer(appContainer);

  const application = appContainer.get<RestApplication>(Component.RestApplication);

  await application.init();
};

bootstrap();
