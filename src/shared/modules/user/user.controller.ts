import { injectable, inject } from 'inversify';
import { BaseController, HttpError, HttpMethod } from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { Request, Response } from 'express';
import { UserService } from './user-service.interface.js';
import { StatusCodes } from 'http-status-codes';
import { Config } from '../../libs/config/config.interface.js';
import { RestSchema } from '../../libs/config/rest.schema.js';
import { fillDTO } from '../../helpers/common.js';
import { UserRdo } from './rdo/user.rdo.js';
import { createSHA256 } from '../../helpers/index.js';
import { CreateUserRequest } from './request-types/create-user-request.type.js';
import { LoginUserRequest } from './request-types/login-user-request.type.js';

enum UserPaths {
  Register = '/register',
  Login = '/login',
  Logout = '/logout',
  DownloadAvatar = '/:userId/avatar'
}

@injectable()
export class UserController extends BaseController {
  private readonly salt: string;

  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestSchema>
  ) {
    super(logger);

    this.logger.info('Register routes for UserController...');
    this.salt = this.config.get('SALT');

    this.addRoute({ path: UserPaths.Register, method: HttpMethod.Post, handler: this.register });
    this.addRoute({ path: UserPaths.Login, method: HttpMethod.Get, handler: this.checkLogin });
    this.addRoute({ path: UserPaths.Login, method: HttpMethod.Post, handler: this.login });
    this.addRoute({ path: UserPaths.Logout, method: HttpMethod.Post, handler: this.logout });
    this.addRoute({ path: UserPaths.DownloadAvatar, method: HttpMethod.Post, handler: this.downloadAvatar });
  }

  public async register({body}: CreateUserRequest, res: Response): Promise<void> {
    const existUser = await this.userService.findByEmail(body.email);

    if (existUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        'Пользователь с таким email уже существует',
        'DUPLICATED_EMAIL'
      );
    }

    const result = await this.userService.create(body, this.salt);
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login({body}: LoginUserRequest, res: Response): Promise<void> {
    const existUser = await this.userService.findByEmail(body.email);
    const authError = new HttpError(StatusCodes.UNAUTHORIZED, 'Неверный логин или пароль', 'INVALID_CREDENTIALS');

    if (!existUser) {
      throw authError;
    }

    const isPasswordCorrect = existUser.getPassword() === createSHA256(body.password, this.salt);

    if (!isPasswordCorrect) {
      throw authError;
    }

    this.ok(res, {
      authToken: 'Bearer token'
    });
  }

  public async checkLogin(_req: Request, res: Response): Promise<void> {
    this.ok(res, {
      authorized: true
    });
  }

  public async logout(_req: Request, res: Response): Promise<void> {
    this.ok(res, {});
  }

  public async downloadAvatar(_req: Request, res: Response): Promise<void> {
    this.ok(res, {});
  }
}
