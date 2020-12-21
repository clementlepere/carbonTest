import { ITreasureHuntEngine } from '../../../game/interfaces/iTreasureHuntEngine';
import { Map } from '../../../models/Map/map';
import { IInstructionsLoader } from '../../interfaces/IInstructionsLoader';
import { IMapLoader } from '../../interfaces/IMapLoader';

export class TreasureHuntService {
  private readonly engine: ITreasureHuntEngine;
  private readonly regionLoader: IMapLoader;
  private readonly instructionLoader: IInstructionsLoader;

  constructor(
    engine: ITreasureHuntEngine,
    regionLoader: IMapLoader,
    instructionLoader: IInstructionsLoader,
  ) {
    this.engine = engine;
    this.regionLoader = regionLoader;
    this.instructionLoader = instructionLoader;
  }

  huntForTreasures(): Map {
    const instructions = this.instructionLoader.getInstructions();
    const region = this.regionLoader.getMap();
    return this.engine.hunt(instructions, region);
  }
}
