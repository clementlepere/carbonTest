import { Injectable } from '@angular/core';
import { Player } from '@shared/models/player/player';

@Injectable()
export class PlayerService {

  constructor() { }

  createPlayer(line: string): Player {
    const lineElements = line.split('- ');
    const name = lineElements[1];
    const playerHorizontalLocation = +lineElements[2];
    const playerVerticalLocation = +lineElements[3];
    const direction = lineElements[4];
    const path = lineElements[5];
    return new Player(name, playerHorizontalLocation, playerVerticalLocation, direction, path);
  }

}
