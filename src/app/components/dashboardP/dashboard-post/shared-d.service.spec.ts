import { TestBed } from '@angular/core/testing';

import { SharedDService } from './shared-d.service';

describe('SharedDService', () => {
  let service: SharedDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
