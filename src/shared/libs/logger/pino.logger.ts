import { Logger as PinoInstance, pino, transport } from 'pino';
import { Logger } from './logger.interface.js';
import { resolve } from 'node:path';
import { getCurrentModuleDirectoryPath } from '../../helpers/file-system.js';
import { injectable } from 'inversify';
import fs from 'node:fs';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    const modulePath = getCurrentModuleDirectoryPath();
    const logDirPath = 'logs/';
    const logFilePath = `${logDirPath}rest.log`;
    const destination = resolve(modulePath, '../../../', logFilePath);
    const logDirDestination = resolve(modulePath, '../../../', logDirPath);

    if (!fs.existsSync(logDirDestination)) {
      fs.mkdirSync(logDirDestination);
    }

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
