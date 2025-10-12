import { Container } from 'inversify';
import { CliApp } from './cli-app.js';
import { Component } from '../shared/types/component.enum.js';
import { Command } from './commands/command.interface.js';
import { ImportCommand } from './commands/import.command.js';
import { Logger } from '../shared/libs/logger/logger.interface.js';
import { ConsoleLogger } from '../shared/libs/logger/console.logger.js';
import { Config } from '../shared/libs/config/config.interface.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { RestConfig } from '../shared/libs/config/index.js';
import { DatabaseClient } from '../shared/libs/database-client/database-client.interface.js';
import { MongoDatabaseClient } from '../shared/libs/database-client/mongo.database-client.js';

export const createCliContainer = (container: Container) => {
  container.bind<CliApp>(Component.CliApplication).to(CliApp).inSingletonScope();
  container.bind<Command>(Component.ImportCommand).to(ImportCommand).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(ConsoleLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  container.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
};
