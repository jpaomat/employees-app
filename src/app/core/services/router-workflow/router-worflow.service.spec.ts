import { TestBed } from '@angular/core/testing';

import { RouterWorflowService } from './router-worflow.service';

describe('RouterWorflowService', () => {
  let service: RouterWorflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterWorflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
