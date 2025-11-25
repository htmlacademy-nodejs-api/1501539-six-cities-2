import { inject, injectable } from 'inversify';
import { Logger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/component.enum.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { DatabaseClient } from '../shared/libs/database-client/database-client.interface.js';
import { getMongoURI } from '../shared/helpers/database.js';
import express, { Express} from 'express';
import { Controller, ExceptionFilter } from '../shared/libs/rest/index.js';
import { ResourcePaths } from '../shared/types/resources.enum.js';

@injectable()
export class RestApplication {
  private readonly server: Express;

  constructor (
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.UserController) private readonly userController: Controller,
    @inject(Component.OfferController) private readonly offerController: Controller,
    @inject(Component.ExceptionFilter) private readonly appExceptionFilter: ExceptionFilter,
    @inject(Component.CommentController) private readonly commentController: Controller
  ) {
    this.server = express();
  }

  private async initDB() {
    const mongoUri = getMongoURI({
      username: this.config.get('DB_USERNAME'),
      password: this.config.get('DB_PASSWORD'),
      port: this.config.get('DB_PORT').toString(),
      host: this.config.get('DB_HOST'),
      databaseName: this.config.get('DB_NAME')
    });

    return this.databaseClient.connect(mongoUri);
  }

  private async initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async initControllers() {
    this.server.use(ResourcePaths.Users, this.userController.router);
    this.server.use(ResourcePaths.Offers, this.offerController.router);
    this.server.use(ResourcePaths.Comments, this.commentController.router);
  }

  private async initMiddleware () {
    this.server.use(express.json());
    this.server.use('/upload', express.static(this.config.get('UPLOAD_DIRECTORY')));
  }

  private async initExceptionFilters() {
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }

  public async init() {
    this.logger.info('Application initialization success');
    this.logger.info(`PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database...');
    await this.initDB();
    this.logger.info('Init database success');

    this.logger.info('Init app-level middleware');
    this.initMiddleware();
    this.logger.info('App-level middleware initialization completed');

    this.logger.info('Init controllers');
    await this.initControllers();
    this.logger.info('Controller initialization completed');

    this.logger.info('Init exception filters');
    this.initExceptionFilters();
    this.logger.info('Exception filters initialization completed');

    this.logger.info('Try to init server...');
    await this.initServer();
    this.logger.info(`🚀 Server started on http://localhost:${this.config.get('PORT')}`);

    this.server.get('/', (_req, res) => {
      res.send('Hello');
    });
  }
}
