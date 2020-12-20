import { Adventurer } from "../Adventurer/adventurer";
import { Coordinates } from "../Coordinates/coordinates";
import { Treasure } from "../Treasure/treasure";

export class Instruction {
    readonly path: string;
    adventurer: Adventurer;
    
    constructor(path: string, adenturer: Adventurer){
        this.path = path;
        this.adventurer = adenturer;
    }
    move(coordinates: Coordinates, direction: string) {
        return;
    }

    takeTreasure(treasure: Treasure) {

    }

    turn() {

    }
}