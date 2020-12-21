import { Coordinates } from '../Coordinates/coordinates';

export class Treasure {
  coordinates: Coordinates;
  score: number;

  constructor(x: number, y: number, score: number) {
    this.coordinates = new Coordinates(x,y);
    this.score = score;
  }

  takeTreasure() {
    this.score = this.score - 1;
  }
}
