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
    it('Should throw an error when mountain inputs are incorrect', () => {
      const line = 'M - 99 - 0';
      fixture.whenStable().then(() => {
        expect(() => { component.addMountain(board, line); }).toThrow(new Error('Error on mountain creation'));
      });
    });
  });

  describe('Player creation', () => {
    const board = [
      ['X', 'X', 'X'],
      ['X', 'X', 'X'],
      ['X', 'X', 'X'],
    ];
    it('Should add a new player to the board', () => {
      const line = 'A - Lara - 1 - 1 - S - AADADAGGA';

      const expectedResult = [
        ['X', 'X', 'X'],
        ['X', 'A - Lara - 1 - 1 - S - 0', 'X'],
        ['X', 'X', 'X'],
      ];

      fixture.whenStable().then(() => {
        expect(component.addPlayer(board, line)).toEqual(expectedResult);
      });
    });
    it('Should throw an error when player inputs are incorrect', () => {
      const line = 'A - Lara - 99 - 1 - S - AADADAGGA';
      fixture.whenStable().then(() => {
        expect(() => { component.addPlayer(board, line); }).toThrow(new Error('Error on player creation'));
      });
    });
  });
});

