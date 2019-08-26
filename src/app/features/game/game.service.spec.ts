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
    it('getFinalScore should return 2', () => {

      let gameService: GameService;
      beforeEach(() => gameService = TestBed.get(GameService));

      const inputBoardData = new Board(3, 4);

      const inputTreasuresData = Array<Treasure>();
      inputTreasuresData.push(new Treasure(0, 3, 2));
      inputTreasuresData.push(new Treasure(1, 3, 3));

      const inputMountainsData = Array<Mountain>();
      inputMountainsData.push(new Mountain(1, 0));
      inputMountainsData.push(new Mountain(2, 1));

      const inputPlayersData = Array<Player>();
      inputPlayersData.push(new Player('Lara', 1, 1, 'S', 'AADADAGGA'));

      const expectedResult = 2;
      expect(gameService.getPlayerScore(inputPlayersData, inputTreasuresData)).toEqual(expectedResult);
    });
  });

});
