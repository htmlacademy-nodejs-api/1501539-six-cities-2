import { CitiesName } from './cities-name.enum.js';
import { OfferConvenience, OfferType } from './offer.interface.js';
import { User } from './user.interface.js';

export type MockData = {
    names: string[],
    descriptions: string[],
    cities: CitiesName[],
    previewImages: string[],
    images: string[],
    isPremium: boolean[],
    isFavorite: boolean[],
    types: OfferType[],
    conveniences: OfferConvenience[],
    authors: User[];
  }
