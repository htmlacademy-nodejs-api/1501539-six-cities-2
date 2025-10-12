import dayjs from 'dayjs';
import { CITIES } from '../constants/index.js';
import { MockData } from '../types/mock-data.type.js';
import { Offer } from '../types/offer.interface.js';
import { generateRandomValue, getRandomItem, getRandomItems } from './common.js';

enum Rating {
  MIN = 1,
  MAX = 5,
}

enum RoomNumbers {
  MIN = 1,
  MAX = 8
}

enum GuestNumber {
  MIN = 1,
  MAX = 10
}

enum Price {
  MIN = 100,
  MAX = 100000
}

enum WeekDay {
  FIRST = 1,
  LAST = 7
}

export const getMockOffer = (data: MockData): Offer => {
  const {names, descriptions, cities, previewImages, images, isPremium, isFavorite, types, conveniences, authors} = data;
  const city = getRandomItem(cities);

  return {
    name: getRandomItem(names),
    description: getRandomItem(descriptions),
    datePublished: dayjs()
      .subtract(generateRandomValue(WeekDay.FIRST, WeekDay.LAST), 'day')
      .toDate(),
    city,
    previewImage: getRandomItem(previewImages),
    images,
    isPremium: getRandomItem(isPremium),
    isFavorite: getRandomItem(isFavorite),
    rating: generateRandomValue(Rating.MIN, Rating.MAX),
    type: getRandomItem(types),
    roomsNumber: generateRandomValue(RoomNumbers.MIN, RoomNumbers.MAX),
    guestNumber: generateRandomValue(GuestNumber.MIN, GuestNumber.MAX),
    price: generateRandomValue(Price.MIN, Price.MAX),
    convenience: getRandomItems(conveniences),
    author: getRandomItem(authors),
    coordinates: CITIES[city]
  };
};

