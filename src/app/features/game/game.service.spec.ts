import { TestBed } from '@angular/core/testing';

import { Player } from '@shared/models/player/player';
import { Board } from '@shared/models/board/board';
import { Mountain } from '@shared/models/mountain/mountain';
import { Treasure } from '@shared/models/treasure/treasure';
import { GameService } from './game.service';

describe('GameService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [GameService]
  }));

  it('should be created', () => {
    const service: GameService = TestBed.get(GameService);
    expect(service).toBeTruthy();
  });

  describe('getFinalScore', () => {
    let gameService: GameService;
    beforeEach(() => gameService = TestBed.get(GameService));

    it('getFinalScore should return 1', () => {

      const inputTreasuresData = Array<Treasure>();
      inputTreasuresData.push(new Treasure(1, 1, 2));

      const inputPlayersData = Array<Player>();
      inputPlayersData.push(new Player('Lara', 1, 1, 'S', 'A'));

      const expectedResult = 1;
      expect(gameService.getPlayerScore(inputPlayersData, inputTreasuresData)).toEqual(expectedResult);
    });
  });

});
