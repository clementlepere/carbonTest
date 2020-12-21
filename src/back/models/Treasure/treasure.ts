import { Coordinates } from '../Coordinates/coordinates';

export class Treasure extends Coordinates {
  score: number;

  constructor(x: number, y: number, score: number) {
    super(x, y);
    this.score = score;
  }

  takeTreasure() {
    this.score = this.score - 1;
  }
}
