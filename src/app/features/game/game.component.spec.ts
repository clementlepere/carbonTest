import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '@app/app.module';

import { GameComponent } from './game.component';
import { GameModule } from './game.module';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        GameModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Board creation', () => {
    it('Should initialize a new board', () => {
      const inputData = 'C - 3 - 3';
      const expectedResult = [
        ['X', 'X', 'X'],
        ['X', 'X', 'X'],
        ['X', 'X', 'X'],
      ];
      fixture.whenStable().then(() => {
        expect(component.createBoard(inputData)).toEqual(expectedResult);
      });
    });
  });

  describe('Moutain creation', () => {
    const board = [
      ['X', 'X', 'X'],
      ['X', 'X', 'X'],
      ['X', 'X', 'X'],
    ];
    it('Should add a new mountain to the board', () => {
      const line = 'M - 1 - 0';
      const expectedResult = [
        ['X', 'M - 1 - 0', 'X'],
        ['X', 'X', 'X'],
        ['X', 'X', 'X'],
      ];

      fixture.whenStable().then(() => {
        expect(component.addMountain(board, line)).toEqual(expectedResult);
      });
    });
    it('Should throw an error when inputs are not correct', () => {
      const line = 'M - 99 - 0';
      fixture.whenStable().then(() => {
        expect(() => { component.addMountain(board, line); }).toThrow(new Error('Error on mountain creation'));
      });
    });
  });

  // describe('Player creation', () => {
  //   it('new player should be added to the array of players', () => {
  //     const inputData = 'A - Lara - 1 - 1 - S - AADADAGGA';
  //     const expectedResult = new Player('Lara', 1, 1, 'S', 'AADADAGGA');
  //     fixture.whenStable().then(() => {
  //       expect(component.addPlayer(inputData)).toEqual(expectedResult);
  //     });
  //   });
  // });

  // describe('Treasure creation', () => {
  //   it('new treasure should be added to the array of treasures', () => {
  //     const inputData = 'T - 1 - 3 - 3';
  //     const expectedResult = new Treasure(1, 3, 3);
  //     fixture.whenStable().then(() => {
  //       expect(component.addTreasures(inputData)).toEqual(expectedResult);
  //     });
  //   });
  // });

  // describe('Board creation', () => {
  //   it('new board should be added to the board object', () => {
  //     const inputData = 'B - 3 - 4';
  //     const expectedResult = new Board(3, 4);
  //     fixture.whenStable().then(() => {
  //       expect(component.createBoard(inputData)).toEqual(expectedResult);
  //     });
  //   });
  // });

});

