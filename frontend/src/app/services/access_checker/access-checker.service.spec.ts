import { TestBed } from '@angular/core/testing';

import { AccessCheckerService } from './access-checker.service';

describe('AccessCheckerService', () => {
  let service: AccessCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
