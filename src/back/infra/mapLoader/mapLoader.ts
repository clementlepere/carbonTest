import { IAdventurerFactory } from '../../game/interfaces/IAdventurerFactory';
import { Adventurer } from '../../models/Adventurer/adventurer';
import { Map } from '../../models/Map/map';
import { Mountain } from '../../models/Mountain/mountain';
import { Treasure } from '../../models/Treasure/treasure';
import { IFileReader } from '../interfaces/IFileReader';
import { IMapLoader } from '../interfaces/IMapLoader';

export class MapLoader implements IMapLoader {
  private readonly adventurerFactory: IAdventurerFactory;
  private readonly fileReader: IFileReader;

  constructor(adventurerFactory: IAdventurerFactory, fileReader: IFileReader) {
    this.adventurerFactory = adventurerFactory;
    this.fileReader = fileReader;
  }

  public getMap(): Map {
    const mapStringRepresentation = this.fileReader.getMapString();
    const treasures = Array<Treasure>();
    const mountains = Array<Mountain>();
    const adventurers = Array<Adventurer>();
    let xSize = 0;
    let ySize = 0;

    mapStringRepresentation.forEach((line) => {
      const lineElements = line.split('-');
      if (line.includes('M')) {
        xSize = +lineElements[1];
        ySize = +lineElements[2];
      }
      if (line.includes('T')) {
        treasures.push(
          new Treasure(+lineElements[1], +lineElements[2], +lineElements[3]),
        );
      }
      if (line.includes('M')) {
        mountains.push(new Mountain(+lineElements[1], +lineElements[2]));
      }
      if (line.includes('A')) {
        adventurers.push(
          this.adventurerFactory.getOrAddAdventurer(
            lineElements[1],
            +lineElements[2],
            +lineElements[3],
            lineElements[4],
            0,
          ),
        );
      }
    });
    return new Map(adventurers, mountains, treasures, xSize, ySize);
  }
}
