import { Adventurer } from '../Adventurer/adventurer';
import { Mountain } from '../Mountain/mountain';
import { Treasure } from '../Treasure/treasure';

export class Region {
  adventurers: Adventurer[];
  mountains: Mountain[];
  treasures: Treasure[];
  readonly xSize: number;
  readonly ySize: number;

  constructor(
    adventurers: Adventurer[],
    mountains: Mountain[],
    treasures: Treasure[],
    xSize: number,
    ySize: number,
  ) {
    this.adventurers = adventurers;
    this.mountains = mountains;
    this.treasures = treasures;
    this.xSize = xSize;
    this.ySize = ySize;
  }
}
