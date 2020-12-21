import { Adventurer } from '../Adventurer/adventurer';
import { Region } from '../Region/region';

export abstract class Instruction {
  readonly path: string;
  readonly adventurer: Adventurer;

  constructor(path: string, adenturer: Adventurer) {
    this.path = path;
    this.adventurer = adenturer;
  }

  abstract execute(region: Region): Region;
}
