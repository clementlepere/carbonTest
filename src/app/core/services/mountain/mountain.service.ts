import { Injectable } from '@angular/core';
import { Mountain } from '@shared/models/mountain/mountain';

@Injectable()
export class MountainService {

  constructor() { }

  createMountain(line: string): Mountain {
    const lineElements = line.split('- ');
    const mountainHorizontalLocation = +lineElements[1];
    const mountainVerticalLocation = +lineElements[2];
    return new Mountain( mountainHorizontalLocation, mountainVerticalLocation);
  }

}
