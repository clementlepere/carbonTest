import { Adventurer } from '../../../models/Adventurer/adventurer';
import { IAdventurerFactory } from '../../interfaces/IAdventurerFactory';

export class AdventurerFactory implements IAdventurerFactory {
  private adventurersCache: Map<string, Adventurer>;

  public getOrAddAdventurer(
    name: string,
    x: number,
    y: number,
    direction: string,
    score: number,
  ): Adventurer {
    if (this.adventurersCache.has(name)) {
      return this.adventurersCache.get(name);
    }

    const adventurer = new Adventurer(name, x, y, direction, score);
    this.adventurersCache[name] = adventurer;
    return adventurer;
  }
}
