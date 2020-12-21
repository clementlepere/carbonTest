import { Coordinates } from '../Coordinates/coordinates';

export class Mountain {
  coordinates: Coordinates;

  constructor(x: number, y: number) {
    this.coordinates = new Coordinates(x, y);
  }
}
