import { Offer } from '../types/offer.interface.js';

export const offerToTsvRow = (offer: Offer) => {
  const {name, description, datePublished, city, previewImage, images, isPremium, isFavorite, rating, type, roomsNumber, guestNumber, price, convenience, author, coordinates} = offer;
  return `${name}\t${description}\t${datePublished.toISOString()}\t${city}\t${previewImage}\t${images.join(',')}\t${isPremium}\t${isFavorite}\t${rating}\t${type}\t${roomsNumber}\t${guestNumber}\t${price}\t${convenience.join(',')}\t${author.name},${author.email},${author.avatar},${author.type}\t${coordinates.latitude},${coordinates.longitude}`;
};
