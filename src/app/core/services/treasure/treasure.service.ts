import { Injectable } from '@angular/core';
import { Treasure } from '@shared/models/treasure/treasure';

@Injectable()
export class TreasureService {

  constructor() { }

  createTreasure(line: string): Treasure {
    const lineElements = line.split('- ');
    const treasureHorizontalLocation = +lineElements[1];
    const treasureVerticalLocation = +lineElements[2];
    const score = +lineElements[3];
    return new Treasure( treasureHorizontalLocation, treasureVerticalLocation, score);
  }

}
