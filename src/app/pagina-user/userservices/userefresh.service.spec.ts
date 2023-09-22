import { TestBed } from '@angular/core/testing';

import { UserefreshService } from './userefresh.service';

describe('UserefreshService', () => {
  let service: UserefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
