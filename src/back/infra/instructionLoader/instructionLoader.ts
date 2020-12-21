import { IAdventurerFactory } from '../../game/interfaces/IAdventurerFactory';
import { Instruction } from '../../models/Instruction/instruction';
import { MoveInstruction } from '../../models/Instruction/moveInstruction';
import { TurnInstruction } from '../../models/Instruction/turnInstruction';
import { IFileReader } from '../interfaces/IFileReader';
import { IInstructionsLoader } from '../interfaces/IInstructionsLoader';

export class InstructionLoader implements IInstructionsLoader {
  private adventurerFactory: IAdventurerFactory;
  private fileReader: IFileReader;

  constructor(adventurerFactory: IAdventurerFactory, fileReader: IFileReader) {
    this.adventurerFactory = adventurerFactory;
    this.fileReader = fileReader;
  }

  getInstructions(): Instruction[] {
    const instructions: Instruction[] = [];
    const instructionStringRepresentation = this.fileReader.getInstructionsString();
    const turnInstructions: TurnInstruction[] = [];
    const moveInstructions: MoveInstruction[] = [];

    instructionStringRepresentation.forEach((line) => {
      const lineElements = line.split('-');
      if (line.includes('A')) {
        const adventurer = this.adventurerFactory.getOrAddAdventurer(
          lineElements[1],
          +lineElements[2],
          +lineElements[3],
          lineElements[4]
        );
        const path = lineElements[5];
        for (let i = 0; i < path.length; i + 1) {
          switch (path[i]) {
            case 'A':
              moveInstructions.push(new MoveInstruction(path[i], adventurer));
              break;
            case 'G': {
              turnInstructions.push(new TurnInstruction(path[i], adventurer));
              break;
            }
            case 'D': {
              turnInstructions.push(new TurnInstruction(path[i], adventurer));
              break;
            }
          }
        }
        moveInstructions.forEach((moveInstruction) => {
          instructions.push(moveInstruction);
        });
        turnInstructions.forEach((turnInstructions) => {
          instructions.push(turnInstructions);
        });
      }
    });
    return instructions;
  }
}
