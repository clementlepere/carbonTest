import { TestBed } from '@angular/core/testing';

import { TreasureService } from './treasure.service';

describe('TreasureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TreasureService = TestBed.get(TreasureService);
    expect(service).toBeTruthy();
  });
});
