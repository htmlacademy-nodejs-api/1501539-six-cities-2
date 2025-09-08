import { CitiesName } from '../types/index.js';
import { City } from '../types/index.js';

export const CITIES_LIST: City[] = [
  {
    name: CitiesName.PARIS,
    coordinates: {
      latitude: 48.85661,
      longitude: 2.351499
    }
  },
  {
    name: CitiesName.COLOGNE,
    coordinates: {
      latitude: 50.938361,
      longitude: 6.959974
    }
  },
  {
    name: CitiesName.BRUSSELS,
    coordinates: {
      latitude: 50.846557,
      longitude: 4.351697
    }
  },
  {
    name: CitiesName.AMSTERDAM,
    coordinates: {
      latitude: 52.370216,
      longitude: 4.895168
    }
  },
  {
    name: CitiesName.HAMBURG,
    coordinates: {
      latitude: 53.550341,
      longitude: 10.000654
    }
  },
  {
    name: CitiesName.DUSSELDORF,
    coordinates: {
      latitude: 51.225402,
      longitude: 6.776314
    }
  },
];
