import { TestBed } from '@angular/core/testing';

import { RoleGuardTsService } from './role.guard.ts.service';

describe('RoleGuardTsService', () => {
  let service: RoleGuardTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleGuardTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
