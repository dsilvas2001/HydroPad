import { TestBed } from '@angular/core/testing';

import { UserfiretoolsService } from './userfiretools.service';

describe('UserfiretoolsService', () => {
  let service: UserfiretoolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserfiretoolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
