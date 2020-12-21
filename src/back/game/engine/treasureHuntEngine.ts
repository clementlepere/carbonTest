import { Instruction } from '../../models/Instruction/instruction';
import { Map } from '../../models/Map/map';
import { ITreasureHuntEngine } from '../interfaces/ITreasureHuntEngine';

export class TreasureHuntEngine implements ITreasureHuntEngine {
  hunt(instructions: Instruction[], map: Map): Map {
    let returnedMap = map;
    instructions.forEach((instruction) => {
      returnedMap = instruction.execute(map);
    });
    return returnedMap;
  }
}
