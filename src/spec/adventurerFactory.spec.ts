import { AdventurerFactory } from '../back/game/services/adventurerFactory/adventurerFactory';
import { Adventurer } from '../back/models/Adventurer/adventurer';

describe('Get new Adventurer', () => {
  it('Should be returned.', () => {
    const factory = new AdventurerFactory();
    expect(factory.getOrAddAdventurer('Laura', 1, 1, 'D')).toEqual(
      new Adventurer('Laura', 1, 1, 'D'),
    );
  });
});
