import { Player } from './player';

export class Board {
    player: Player;
    tiles;

    constructor(values = {}) {
        Object.assign(this, values);
    }
}
