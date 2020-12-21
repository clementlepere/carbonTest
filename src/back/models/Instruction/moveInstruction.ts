import { Region } from '../Region/region';
import { Coordinates } from '../Coordinates/coordinates';
import { Instruction } from './instruction';

export class MoveInstruction extends Instruction {
  execute(region: Region): Region {
    const storedVerticalLocation = this.adventurer.coordinates.x;
    const storedHorizontalLocation = this.adventurer.coordinates.y;
    let storedCoordinates: Coordinates;

    switch (this.adventurer.direction) {
      case 'N': {
        storedCoordinates = new Coordinates(
          storedVerticalLocation - 1,
          storedHorizontalLocation
        );
        break;
      }
      case 'S': {
        storedCoordinates = new Coordinates(
          storedVerticalLocation + 1,
          storedHorizontalLocation
        );
        break;
      }
      case 'E': {
        storedCoordinates = new Coordinates(
          storedVerticalLocation,
          storedHorizontalLocation + 1
        );
        break;
      }
      case 'O': {
        storedCoordinates = new Coordinates(
          storedVerticalLocation,
          storedHorizontalLocation - 1
        );
        break;
      }
    }

    if (
      this.checkMoveValidity(storedCoordinates, region) &&
      region.adventurers.includes(this.adventurer)
    ) {
      region.adventurers
        .find((a) => a === this.adventurer)
        .move(storedCoordinates);
      this.checkScore(storedCoordinates, region);
    }

    return region;
  }

  private checkMoveValidity(coordinates: Coordinates, region: Region): boolean {
    let isMoveValid = true;

    if (this.isInRegion(coordinates, region) || this.isInMountain(coordinates, region)) {
      isMoveValid = false;
    }

    return isMoveValid;
  }

  private isInMountain(coordinates: Coordinates, region: Region): boolean {
    let warningOnBoard = false;

    if (
      coordinates.x > region.xSize ||
      coordinates.x < 0 ||
      coordinates.y > region.ySize ||
      coordinates.y < region.ySize
    ) {
      warningOnBoard = true;
    }

    return warningOnBoard;
  }

  private isInRegion(coordinates: Coordinates, region: Region): boolean {
    let warningOnMountain = false;

    if (region.mountains.some((m) => m.coordinates === coordinates)) {
      warningOnMountain = true;
    }

    return warningOnMountain;
  }

  private checkScore(coordinates: Coordinates, region: Region) {
    if (region.treasures.some((t) => t.coordinates === coordinates)) {
      const treasure = region.treasures.find((t) => t.coordinates === coordinates);
      this.adventurer.increaseScore(treasure);
      treasure.takeTreasure();
    }
  }
}
