import { TestBed } from '@angular/core/testing';

import { ForgottenService } from './forgotten.service';

describe('ForgottenService', () => {
  let service: ForgottenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgottenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
