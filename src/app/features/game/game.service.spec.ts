import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

describe('GameService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [GameService]
  }));

  it('should be created', () => {
    const service: GameService = TestBed.get(GameService);
    expect(service).toBeTruthy();
  });

  describe('Check move', () => {
    let gameService: GameService;
    beforeEach(() => gameService = TestBed.get(GameService));
    const board = [
      ['X', 'M - 1 - 0', 'X'],
      ['X', 'X', 'X'],
      ['X', 'X', 'X'],
    ];
    it('Should return true to valid move', () => {
      const playerVerticalLocation = 1;
      const playerHorizontalLocation = 1;
      const expectedResult = true;
      expect(gameService.checkMoveValidity(board, playerVerticalLocation, playerHorizontalLocation)).toEqual(expectedResult);
    });
    it('Should return true to invalid move', () => {
      const playerVerticalLocation = 0;
      const playerHorizontalLocation = 1;
      const expectedResult = false;
      expect(gameService.checkMoveValidity(board, playerVerticalLocation, playerHorizontalLocation)).toEqual(expectedResult);
    });
  });
});
