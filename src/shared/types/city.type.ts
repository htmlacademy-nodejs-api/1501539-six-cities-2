import { CitiesName } from './cities-name.enum.js';
import { Coordinates } from './coordinates.type.js';

export type City = {
  name: CitiesName;
  coordinates: Coordinates;
}
