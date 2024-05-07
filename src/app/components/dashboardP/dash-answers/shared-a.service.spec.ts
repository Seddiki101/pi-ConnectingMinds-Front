import { TestBed } from '@angular/core/testing';

import { SharedAService } from './shared-a.service';

describe('SharedAService', () => {
  let service: SharedAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
