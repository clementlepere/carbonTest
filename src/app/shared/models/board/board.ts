import { Player } from '@app/shared/models/player/player';
import { Mountain } from '@app/shared/models/mountain/mountain';
import { Treasure } from '@app/shared/models/treasure/treasure';

export class Board {
    width: number;
    height: number;
    mountains: Mountain[];
    players: Player[];
    treasures: Treasure[];

    constructor(width: number, height: number, mountains: Mountain[], players: Player[], treasures: Treasure[]) {
        this.width = (width <= 0 || width === undefined)
            ? 0 : width;
        this.height = (height <= 0 || height === undefined)
            ? 0 : height;
        this.mountains = mountains;
        this.players = players;
        this.treasures = treasures;
    }
}
