import { TreasureHuntEngine } from '../back/game/services/factory/adventurerFactory/engine/treasureHuntEngine';
import * as fs from 'fs';

describe('Get new Adventurer', () => {
  it('Should be returned.', () => {
    const actual = fs.readFileSync('./actual.txt', 'utf-8');
    const engine = new TreasureHuntEngine();
    const expected = fs.readFileSync('./expected.txt', 'utf-8');
    // engine.hunt(actual)
    // expect().toEqual(expected);
  });
});
