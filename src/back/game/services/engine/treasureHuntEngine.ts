import { Instruction } from '../../../models/Instruction/instruction';
import { Region } from '../../../models/Region/region';
import { ITreasureHuntEngine } from '../../interfaces/ITreasureHuntEngine';

export class TreasureHuntEngine implements ITreasureHuntEngine {
  hunt(instructions: Instruction[], region: Region): Region {
    let returnedRegion = region;
    instructions.forEach((instruction) => {
      returnedRegion = instruction.execute(returnedRegion);
    });
    return returnedRegion;
  }
}
