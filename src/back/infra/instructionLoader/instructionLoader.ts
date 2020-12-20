import { IAdventurerFactory } from '../../game/interfaces/IAdventurerFactory';
import { Instruction } from '../../models/Instruction/instruction';
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
        const instructions = new Array<Instruction>();
        const instructionStringRepresentation = this.fileReader.getInstructionsString();

        instructionStringRepresentation.forEach(line => {
            const lineElements = line.split('-');
            if (line.includes('A')) {
                const adventurer = this.adventurerFactory.getOrAddAdventurer(lineElements[1], +lineElements[2],
                    +lineElements[3], lineElements[4], 0);
                const instruction = new Instruction(lineElements[5], adventurer);
                instructions.push(instruction)
            }
        })
        return instructions;
    }
}