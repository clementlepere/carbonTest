import { Instruction } from '../../models/Instruction/instruction';
import { Map } from '../../models/Map/map';

export interface ITreasureHuntEngine {
  hunt(instructions: Instruction[], map: Map): Map;
}
