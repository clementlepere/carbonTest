import { IAdventurerFactory } from '../../game/interfaces/IAdventurerFactory';
import { Adventurer } from '../../models/Adventurer/adventurer';
import { Region } from '../../models/Region/region';
import { Mountain } from '../../models/Mountain/mountain';
import { Treasure } from '../../models/Treasure/treasure';
import { IFileReader } from '../interfaces/IFileReader';
import { IRegionLoader } from '../interfaces/IRegionLoader';

export class RegionLoader implements IRegionLoader {
  private readonly adventurerFactory: IAdventurerFactory;
  private readonly fileReader: IFileReader;

  constructor(adventurerFactory: IAdventurerFactory, fileReader: IFileReader) {
    this.adventurerFactory = adventurerFactory;
    this.fileReader = fileReader;
  }

  public getRegion(): Region {
    const regionStringRepresentation = this.fileReader.getRegionString();
    const treasures = Array<Treasure>();
    const mountains = Array<Mountain>();
    const adventurers = Array<Adventurer>();
    let xSize = 0;
    let ySize = 0;

    regionStringRepresentation.forEach((line) => {
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
          ),
        );
      }
    });
    return new Region(adventurers, mountains, treasures, xSize, ySize);
  }
}
