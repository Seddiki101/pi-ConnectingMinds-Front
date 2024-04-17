import { TestBed } from '@angular/core/testing';

import { ListUserServiceService } from './list-user-service.service';

describe('ListUserServiceService', () => {
  let service: ListUserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListUserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
