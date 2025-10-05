import { Logger } from '../logger/loger.interface.js';
import { Config } from './config.interface.js';
import { config } from 'dotenv';
import { configRestSchema, RestSchema } from './rest.schema.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.enum.js';

@injectable()
export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configRestSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  get<K extends keyof RestSchema>(key: K): RestSchema[K] {
    return this.config[key];
  }
}
