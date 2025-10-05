import { Logger as PinoInstance, pino, transport } from 'pino';
import { Logger } from './loger.interface.js';
import { resolve } from 'node:path';
import { getCurrentModuleDirectoryPath } from '../../helpers/file-system.js';
import { injectable } from 'inversify';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    const modulePath = getCurrentModuleDirectoryPath();
    const logFilePath = 'logs/rest.log';
    const destination = resolve(modulePath, '../../../', logFilePath);

    const multiTransport = transport({
      targets: [
        {
          target: 'pino/file',
          options: { destination },
          level: 'debug'
        },
        {
          target: 'pino/file',
          level: 'info',
          options: {}
        }
      ]
    });


    this.logger = pino({}, multiTransport);
    this.logger.info('Logger created…');
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }

  public error(message:string) {
    this.logger.error(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public info(message:string): void {
    this.logger.info(message);
  }
}
