import { Instruction } from '../../models/Instruction/instruction';

export interface IInstructionsLoader {
  getInstructions(): Instruction[];
}
