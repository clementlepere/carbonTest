import { Adventurer } from "../../models/Adventurer/adventurer";

export interface IAdventurerFactory {
  getOrAddAdventurer(
    name: string,
    x: number,
    y: number,
    direction: string,
    score: number,
  ): Adventurer;
}
