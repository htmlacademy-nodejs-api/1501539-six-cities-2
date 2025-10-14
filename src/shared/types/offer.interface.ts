import { Coordinates } from './coordinates.type.js';
import { User } from './user.interface.js';

export enum OfferType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  ROOM = 'room',
  HOTEL = 'hotel'
}

export enum OfferConvenience {
  BREAKFAST = 'Breakfast',
  AIR_CONDITIONING = 'Air conditioning',
  LAPTOP_FRIENDLY_WORKSPACE = 'Laptop friendly workspace',
  BABY_SEAT = 'Baby seat',
  WASHER = 'Washer',
  TOWELS = 'Towels',
  FRIDGE = 'Fridge',
}

export interface Offer {
  name: string;
  description: string;
  datePublished: Date;
  city: string;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  roomsNumber: number;
  guestNumber: number;
  price: number;
  convenience: OfferConvenience[];
  author: User;
  commentsNumber?: number;
  coordinates: Coordinates;
}
