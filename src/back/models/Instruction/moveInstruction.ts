import { Map } from '../../models/Map/map';
import { Coordinates } from '../Coordinates/coordinates';
import { Instruction } from './instruction';

export class MoveInstruction extends Instruction {
  execute(map: Map): Map {
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
      this.checkMoveValidity(storedCoordinates, map) &&
      map.adventurers.includes(this.adventurer)
    ) {
      map.adventurers
        .find((a) => a === this.adventurer)
        .move(storedCoordinates);
      this.checkScore(storedCoordinates, map);
    }

    return map;
  }

  private checkMoveValidity(coordinates: Coordinates, map: Map): boolean {
    let warningOnBoard = false;
    let warningOnMountain = false;
    let isMoveValid = true;

    if (
      map.mountains.some((m) => m.x === coordinates.x && m.y === coordinates.y)
    ) {
      warningOnMountain = true;
    }

    if (
      coordinates.x > map.xSize ||
      coordinates.x < 0 ||
      coordinates.y > map.ySize ||
      coordinates.y < map.ySize
    ) {
      warningOnBoard = true;
    }

    if (warningOnBoard || warningOnMountain) {
      isMoveValid = false;
    }

    return isMoveValid;
  }

  private checkScore(coordinates: Coordinates, map: Map) {
    if (
      map.treasures.some((t) => t.x === coordinates.x && t.y === coordinates.y)
    ) {
      const treasure = map.treasures.find(
        (t) => t.x === coordinates.x && t.y === coordinates.y
      );
      this.adventurer.increaseScore(treasure);
      treasure.takeTreasure();
    }
  }
}
