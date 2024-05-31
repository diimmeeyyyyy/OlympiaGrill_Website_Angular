import { TestBed } from '@angular/core/testing';

import { LogInAndRegisterService } from './log-in-and-register.service';

describe('LogInAndRegisterService', () => {
  let service: LogInAndRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogInAndRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
