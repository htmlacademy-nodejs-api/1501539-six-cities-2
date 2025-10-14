import { inject, injectable } from 'inversify';
import { Logger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/component.enum.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { DatabaseClient } from '../shared/libs/database-client/database-client.interface.js';
import { getMongoURI } from '../shared/helpers/database.js';

@injectable()
export class RestApplication {
  constructor (
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
  ) {}

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

  public async init() {
    this.logger.info('Application initialization success');
    this.logger.info(`PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database...');
    await this.initDB();
    this.logger.info('Init database success');
  }
}
