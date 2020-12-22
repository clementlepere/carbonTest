import { Coordinates } from '../Coordinates/coordinates';
import { Treasure } from '../Treasure/treasure';

export class Adventurer {
  score: number;
  coordinates: Coordinates;
  direction: string;
  readonly name: string;

  constructor(name: string, x: number, y: number, direction: string) {
    this.score = 0;
    this.coordinates = new Coordinates(x, y);
    this.direction = direction;
    this.name = name;
  }

  move(coordinates: Coordinates) {
    this.coordinates = coordinates;
  }

  increaseScore(treasure: Treasure) {
    if (treasure.coordinates === this.coordinates) {
      this.score + 1;
    }
  }

  turn(direction: string) {
    this.direction = direction;
  }
}
