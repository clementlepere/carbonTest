import { IInstructionsLoader } from '../../infra/interfaces/IInstructionsLoader';
import { IMapLoader } from '../../infra/interfaces/IMapLoader';
import { Instruction } from '../../models/Instruction/instruction';
import { MoveInstruction } from '../../models/Instruction/moveInstruction';
import { Map } from '../../models/Map/map';
import { ITreasureHuntEngine } from '../interfaces/ITreasureHuntEngine';

export class TreasureHuntEngine implements ITreasureHuntEngine {
  hunt(instructions: Instruction[], map: Map): Map {
    instructions.forEach((instruction) => {
      map = instruction.execute(map);
    });
    return map;
  }
}
