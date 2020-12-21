import { Coordinates } from '../../../models/Coordinates/coordinates';

export class CoordinatesFactory {
  maxXValue: number;
  maxYValue: number;

  buildCoordinates(x: number, y: number): Coordinates {
    const coordinate = new Coordinates(x, y);
    return coordinate;
  }
}
