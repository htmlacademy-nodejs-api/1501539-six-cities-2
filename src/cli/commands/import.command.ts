import { Command } from './command.interface.js';
import { getErrorMessage, getMongoURI, tsvRowToOffer } from '../../shared/helpers/index.js';
import { TSVFileReader, TSVFileReaderEvents } from '../../shared/libs/file-reader/index.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../shared/types/component.enum.js';
import { Logger } from '../../shared/libs/logger/logger.interface.js';
import { DatabaseClient } from '../../shared/libs/database-client/database-client.interface.js';
import { OfferService } from '../../shared/modules/offer/offer-service.interface.js';
import { UserService } from '../../shared/modules/user/user-service.interface.js';
import { Config } from '../../shared/libs/config/config.interface.js';
import { RestSchema } from '../../shared/libs/config/rest.schema.js';
import { Offer } from '../../shared/types/offer.interface.js';

const DEFAULT_USER_PASSWORD = 'qwerty';

@injectable()
export class ImportCommand implements Command {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestSchema>
  ) {}

  public getName() {
    return '--import';
  }

  private async saveOffer(offer: Offer) {
    const {
      name,
      description,
      datePublished,
      city,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      roomsNumber,
      guestNumber,
      price,
      convenience,
      author,
      coordinates,
    } = offer;


    const user = await this.userService.findOrCreate({
      ...author,
      password: DEFAULT_USER_PASSWORD
    }, this.config.get('SALT'));

    await this.offerService.create({
      name,
      description,
      datePublished,
      city,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      roomsNumber,
      guestNumber,
      price,
      convenience,
      authorId: user.id,
      coordinates,
    });
  }

  private async onImportedLine(row:string, resolve: () => void) {
    const offer = tsvRowToOffer(row);
    await this.saveOffer(offer);
    this.logger.info(JSON.stringify(offer));
    resolve();
  }

  private onCompleteImport(count: number) {
    this.logger.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [tsvFilePath] = parameters;
    const uri = getMongoURI({
      databaseName: this.config.get('DB_NAME'),
      password: this.config.get('DB_PASSWORD'),
      username: this.config.get('DB_USERNAME'),
      port: this.config.get('DB_PORT').toString(),
      host: this.config.get('DB_HOST')
    });

    await this.databaseClient.connect(uri);
    const fileReader = new TSVFileReader(tsvFilePath.trim());

    fileReader.on(TSVFileReaderEvents.LINE, (row, resolve) => this.onImportedLine(row, resolve));
    fileReader.on(TSVFileReaderEvents.END, this.onCompleteImport);
    try {
      await fileReader.read();
    } catch (error) {
      this.logger.error(`Can't import data from file: ${tsvFilePath}`);
      this.logger.error(getErrorMessage(error));
      this.databaseClient.disconnect();
    }
  }
}
