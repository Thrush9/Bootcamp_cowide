import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LandingpageGuard } from './landingpage.guard';

describe('LandingpageGuard', () => {
  let guard: LandingpageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule]
    });
    guard = TestBed.inject(LandingpageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
