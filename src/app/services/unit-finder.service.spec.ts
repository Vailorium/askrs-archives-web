import { TestBed } from '@angular/core/testing';

import { UnitFinderService } from './unit-finder.service';

describe('UnitFinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnitFinderService = TestBed.get(UnitFinderService);
    expect(service).toBeTruthy();
  });
});
