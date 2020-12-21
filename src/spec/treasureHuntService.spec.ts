import * as fs from 'fs';

import { TreasureHuntService } from '../back/infra/services/treasureHuntService/treasureHuntService';
import { ITreasureHuntEngine } from '../../../game/interfaces/iTreasureHuntEngine';
import { Region } from '../../../models/Region/region';
import { IInstructionsLoader } from '../../interfaces/IInstructionsLoader';
import { IRegionLoader } from '../../interfaces/IRegionLoader';
import { IRegionWriter } from '../../interfaces/IRegionWriter';

let engine: ITreasureHuntEngine;
let region: IRegionLoader;
let instruction: IInstructionsLoader;
let writer: IRegionWriter;

beforeEach(() => {
  component = fixture.componentInstance;
  fixture.detectChanges();
}); 

describe('jasmine spies on object', () => {
  it('mocks the api.greeting()', () => {
      const engine )
    engine = new ITreasureHuntEngine();

    spyOn(engine, 'greeting').and.callFake(() => {
      console.log('stubbed `api.greeting()`');
    });
    api.hello();
    expect(api.greeting).toHaveBeenCalled();
  });
});

describe('Get new Adventurer', () => {
  it('Should be returned.', () => {
    const actual = fs.readFileSync('./actual.txt', 'utf-8');
    const engine = new TreasureHuntService(new ITreasureHuntEngine());
    const expected = fs.readFileSync('./expected.txt', 'utf-8');
    engine.hunt(actual);
    expect().toEqual(expected);
  });
});
