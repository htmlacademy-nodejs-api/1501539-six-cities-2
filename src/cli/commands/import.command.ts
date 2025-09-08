import { readFileSync } from 'node:fs';
import { Command } from './command.interface.js';
import { resolve } from 'node:path';
import { Offer, OfferConvenience, OfferType } from '../../shared/types/offer.interface.js';
import { UserType } from '../../shared/types/user.interface.js';
import chalk from 'chalk';

const stringToBoolean = (str: string): boolean => str === 'true';

export class ImportCommand implements Command {
  public getName() {
    return '--import';
  }

  private getOffers(tsvFilePath: string) {
    return readFileSync(resolve(tsvFilePath), 'utf-8')
      .split('\n')
      .filter((item) => item !== '')
      .map((offer) => {
        const [
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
          coordinates
        ] = offer.split('\t');
        const [userName, email, avatar, password, userType] = author.split(',');
        const [latitude, longitude] = coordinates.split(',');
        return {
          name,
          description,
          datePublished,
          city,
          previewImage,
          images: images.split(','),
          isPremium: stringToBoolean(isPremium),
          isFavorite: stringToBoolean(isFavorite),
          rating: Number(rating),
          type: type as OfferType,
          roomsNumber: Number(roomsNumber),
          guestNumber: Number(guestNumber),
          price: Number(price),
          convenience: convenience.split(',') as OfferConvenience[],
          author: {
            name: userName,
            email,
            avatar,
            password,
            type: userType as UserType,
          },
          coordinates: {latitude: Number(latitude), longitude: Number(longitude)}
        };
      });
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [tsvFilePath] = parameters;
    try {
      const offers: Offer[] = this.getOffers(tsvFilePath);
      console.log(chalk.yellow(JSON.stringify(offers)));
    } catch {
      throw new Error('Invalid file type');
    }
  }
}
