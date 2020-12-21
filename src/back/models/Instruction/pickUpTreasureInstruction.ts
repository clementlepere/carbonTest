import { Map } from '../../models/Map/map';
import { Instruction } from './instruction';

export class PickUpTreasureInstruction extends Instruction {
  execute(map: Map): Map {
    let storedMap: Map;
    const treasure = map.treasures.find(
      (t) =>
        t.x === this.adventurer.coordinates.x &&
        t.y === this.adventurer.coordinates.y
    );
    if (treasure !== undefined) {
        map.treasures.find(t => t === treasure).takeTreasure();
        storedMap = map;
    }
    return storedMap;
  }
}
