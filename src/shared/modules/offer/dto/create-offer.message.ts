export const CreateOfferValidationMessage = {
  name: {
    minLength: 'Минимальная длина 10 символов',
    maxLength: 'Максимальная длина 100 символов'
  },
  description: {
    minLength: 'Минимальная длина 20 символов',
    maxLength: 'Максимальная длина 1024 символа'
  },
  datePublished: {
    invalidFormat: 'Формат даты ISO'
  },
  city: {
    invalid: 'Доступные значения из списка Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf'
  },
  previewImage: {
    maxLength: 'Максимальная длина 256 символов'
  },
  images: {
    invalidFormat: 'Значение должно быть типа Array',
    length: 'Длинна массива 6'
  },
  isPremium: {
    invalidFormat: 'Значение должно быть true или false'
  },
  isFavorite: {
    invalidFormat: 'Значение должно быть true или false'
  },
  rating: {
    invalidFormat: 'Значение должно быть числом, допускается число с 1 знаком после запятой',
    min: 'Минимально значение 1',
    max: 'Максимальное значение 5'
  },
  type: {
    invalid: 'Значение должно быть из списка apartment, house, room, hotel',
  },
  roomsNumber: {
    invalidFormat: 'Значение должно быть числом',
    min: 'Минимально значение 1',
    max: 'Максимальное значение 8'
  },
  guestNumber: {
    invalidFormat: 'Значение должно быть числом',
    min: 'Минимально значение 1',
    max: 'Максимальное значение 10'
  },
  price: {
    invalidFormat: 'Значение должно быть числом',
    min: 'Минимально значение 100',
    max: 'Максимальное значение 100 000'
  },
  convenience: {
    invalidFormat: 'Значение должно быть типа Array',
    empty: 'Должно быть хотя бы одно значение',
    invalid: 'Значения должны быть из списка Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels, Fridge'
  },
  authorId: {
    invalidFormat: 'Значение должно соответствовать ObjectId из MongoDB'
  },
  coordinates: {
    latitude: 'Широта должна быть в диапазоне от -90 до 90',
    longitude: 'Долгота должна быть в диапазоне от -180 до 180'
  },
  commentNumber: {
    invalidFormat: 'Значение должно быть числом'
  }
};
