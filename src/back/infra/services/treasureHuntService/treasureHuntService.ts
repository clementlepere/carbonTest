import { ITreasureHuntEngine } from '../../../game/interfaces/iTreasureHuntEngine';
import { Region } from '../../../models/Region/region';
import { IInstructionsLoader } from '../../interfaces/IInstructionsLoader';
import { IRegionLoader } from '../../interfaces/IRegionLoader';
import { IRegionWriter } from '../../interfaces/IRegionWriter';

export class TreasureHuntService {
  private readonly engine: ITreasureHuntEngine;
  private readonly regionLoader: IRegionLoader;
  private readonly instructionLoader: IInstructionsLoader;
  private readonly regionWriter: IRegionWriter;

  constructor(
    engine: ITreasureHuntEngine,
    regionLoader: IRegionLoader,
    instructionLoader: IInstructionsLoader,
    regionWriter: IRegionWriter,
  ) {
    this.engine = engine;
    this.regionLoader = regionLoader;
    this.instructionLoader = instructionLoader;
    this.regionWriter = regionWriter;
  }

  huntForTreasures(): Region {
    const instructions = this.instructionLoader.getInstructions();
    const actualRegion = this.regionLoader.getRegion();
    const returnedRegion = this.engine.hunt(instructions, actualRegion);
    this.regionWriter.writeRegion(returnedRegion);
    return returnedRegion;
  }
}
