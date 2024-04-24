import { TestBed } from '@angular/core/testing';

import { SharedWService } from './shared-w.service';

describe('SharedWService', () => {
  let service: SharedWService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedWService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
