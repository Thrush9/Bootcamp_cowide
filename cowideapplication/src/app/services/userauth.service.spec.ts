import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserauthService } from './userauth.service';

describe('UserauthService', () => {
  let service: UserauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(UserauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
