import * as fs from 'fs';

import { Region } from '../../models/Region/region';
import { IRegionWriter } from '../interfaces/IRegionWriter';

export class RegionWriter implements IRegionWriter {
  writeRegion(region: Region): void {
    let file: string;
    const regionOutput = this.createRegionOutput(region);
    const treasureOutput = this.createTreasureOutput(region);
    const adventurerOutput = this.createAdventurerOutput(region);
    const mountainOutput = this.createMountainOutput(region);
    file = regionOutput.concat(`
      ${mountainOutput} + '\n',
      ${treasureOutput} + '\n',
      ${adventurerOutput} + '\n'`);

    fs.writeFile('carbonOutput.txt', file, (err) => {
      if (err) return console.log(err);
      console.log('carbonOutput.txt', file);
    });
  }

  private createRegionOutput(region: Region): string {
    const output = `C - ${region.xSize} -  ${region.ySize}`;
    return output;
  }

  private createTreasureOutput(region: Region): string {
    const output: string[] = [];
    region.treasures.forEach((treasure) => {
      output.push(`T - ${treasure.coordinates.x} - ${treasure.coordinates.y} - ${treasure.score}`);
    });
    return output.join('\n');
  }

  private createAdventurerOutput(region: Region): string {
    const output: string[] = [];
    region.adventurers.forEach((adventurer) => {
      output.push(
        `A -  ${adventurer.name} - ${adventurer.coordinates.x} - ${adventurer.coordinates.y} - ${adventurer.score}`,
      );
    });
    return output.join('\n');
  }

  private createMountainOutput(region: Region): string {
    const output: string[] = [];
    region.mountains.forEach((mountain) => {
      output.push(`M - ${mountain.coordinates.x} -  ${mountain.coordinates.y}`);
    });
    return output.join('\n');
  }
}
