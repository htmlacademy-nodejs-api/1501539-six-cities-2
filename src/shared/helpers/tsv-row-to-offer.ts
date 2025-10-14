import { Offer, OfferConvenience, OfferType } from '../types/offer.interface.js';
import { UserType } from '../types/user.interface.js';

const stringToBoolean = (str: string): boolean => str === 'true';

export const tsvRowToOffer = (row: string): Offer => {
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
  ] = row.split('\t');
  const [userName, email, avatar, userType] = author.split(',');
  const [latitude, longitude] = coordinates.split(',');
  return {
    name,
    description,
    datePublished: new Date(datePublished),
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
      type: userType as UserType,
    },
    coordinates: {latitude: Number(latitude), longitude: Number(longitude)}
  };
};
