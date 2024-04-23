import { TestBed } from '@angular/core/testing';

import { ProjectSharedDataService } from './project-shared-data.service';

describe('ProjectSharedDataService', () => {
  let service: ProjectSharedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectSharedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
