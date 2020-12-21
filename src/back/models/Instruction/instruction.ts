import { Adventurer } from '../Adventurer/adventurer';
import { Map } from '../../models/Map/map';

export abstract class Instruction {
  readonly path: string;
  readonly adventurer: Adventurer;

  constructor(path: string, adenturer: Adventurer) {
    this.path = path;
    this.adventurer = adenturer;
  }

  abstract execute(map: Map): Map;
}
