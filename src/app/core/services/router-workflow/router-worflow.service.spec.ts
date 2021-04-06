import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { RouterWorflowService } from './router-worflow.service';

describe('RouterWorflowService', () => {
  let service: RouterWorflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
        RouterModule
      ],
      providers: [
        HttpClient
      ]
    });
    service = TestBed.inject(RouterWorflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
