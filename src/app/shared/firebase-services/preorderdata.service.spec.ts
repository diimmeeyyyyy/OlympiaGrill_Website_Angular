import { TestBed } from '@angular/core/testing';

import { PreorderdataService } from './preorderdata.service';

describe('PreorderdataService', () => {
  let service: PreorderdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreorderdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
