import { TestBed } from '@angular/core/testing';

import { BackuserService } from './backuser.service';

describe('BackuserService', () => {
  let service: BackuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
