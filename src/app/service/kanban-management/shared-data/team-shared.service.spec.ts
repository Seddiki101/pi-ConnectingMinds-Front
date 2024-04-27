import { TestBed } from '@angular/core/testing';

import { TeamSharedService } from './team-shared.service';

describe('TeamSharedService', () => {
  let service: TeamSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
