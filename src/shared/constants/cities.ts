import { CitiesName, Coordinates } from '../types/index.js';

export const CITIES: Record<CitiesName, Coordinates> = {
  [CitiesName.PARIS]:  {
    latitude: 48.85661,
    longitude: 2.351499
  },
  [CitiesName.COLOGNE]: {
    latitude: 50.938361,
    longitude: 6.959974
  },
  [CitiesName.BRUSSELS]: {
    latitude: 50.846557,
    longitude: 4.351697
  },
  [CitiesName.AMSTERDAM]: {
    latitude: 52.370216,
    longitude: 4.895168
  },
  [CitiesName.HAMBURG]: {
    latitude: 53.550341,
    longitude: 10.000654
  },
  [CitiesName.DUSSELDORF]: {
    latitude: 51.225402,
    longitude: 6.776314
  },
};
