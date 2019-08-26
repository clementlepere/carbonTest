import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Player } from '@shared/models/player/player';
import { Board } from '@shared/models/board/board';
import { Mountain } from '@shared/models/mountain/mountain';
import { Treasure } from '@shared/models/treasure/treasure';
import { GameComponent } from './game.component';
import { GameModule } from './game.module';
import { AppModule } from '@app/app.module';

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

  describe('Moutain creation', () => {
    it('new mountain should be added to the array of mountains', () => {
      const inputData = 'M - 1 - 2';
      const expectedResult = new Mountain(1, 2);
      fixture.whenStable().then(() => {
        expect(component.createMountain(inputData)).toEqual(expectedResult);
      });
    });
  });

  describe('Player creation', () => {
    it('new player should be added to the array of players', () => {
      const inputData = 'A - Lara - 1 - 1 - S - AADADAGGA';
      const expectedResult = new Player('Lara', 1, 1, 'S', 'AADADAGGA');
      fixture.whenStable().then(() => {
        expect(component.createMountain(inputData)).toEqual(expectedResult);
      });
    });
  });

  describe('Treasure creation', () => {
    it('new treasure should be added to the array of treasures', () => {
      const inputData = 'T - 1 - 3 - 3';
      const expectedResult = new Treasure(1, 2, 3);
      fixture.whenStable().then(() => {
        expect(component.createMountain(inputData)).toEqual(expectedResult);
      });
    });
  });

  describe('Board creation', () => {
    it('new board should be added to the board object', () => {
      const inputData = 'B - 3 - 4';
      const expectedResult = new Board(3, 4);
      fixture.whenStable().then(() => {
        expect(component.createMountain(inputData)).toEqual(expectedResult);
      });
    });
  });

});

