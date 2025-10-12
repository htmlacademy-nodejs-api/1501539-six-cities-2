import { Container } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { DefaultUserService } from './default-user.service.js';
import { UserService } from './user-service.interface.js';
import { types } from '@typegoose/typegoose';
import { UserEntity, UserModel } from './user.entity.js';

export const createUserContainer = (container: Container) => {
  container.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  container.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
};
