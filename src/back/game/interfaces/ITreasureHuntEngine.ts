import { Instruction } from '../../models/Instruction/instruction';
import { Region } from '../../models/Region/region';

export interface ITreasureHuntEngine {
  hunt(instructions: Instruction[], region: Region): Region;
}
