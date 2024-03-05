import { TestBed } from '@angular/core/testing';

import { AddTeamService } from './add-team.service';

describe('AddTeamService', () => {
  let service: AddTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
