import { IInstructionsLoader } from '../../infra/interfaces/IInstructionsLoader';
import { IMapLoader } from '../../infra/interfaces/IMapLoader';
import { Instruction } from '../../models/Instruction/instruction';
import { Map } from '../../models/Map/map';
import { ITreasureHuntEngine } from '../interfaces/ITreasureHuntEngine';

export class treasureHuntEngine implements ITreasureHuntEngine {
    private readonly regionLoader: IMapLoader;
    private readonly instructionLoader: IInstructionsLoader;

    hunt(instructions: Instruction[], map: Map): Map {
        instructions.forEach(instruction => {
            for (let i = 0; i < instruction.path.length; i++) {
                const movement = instruction.path.charAt(i);
                instruction.adventurer.move(movement, instruction.adventurer.direction, map);
            }
        })
    }
}