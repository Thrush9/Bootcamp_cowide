import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RoutingserviceService } from './routingservice.service';

describe('RoutingserviceService', () => {
  let service: RoutingserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(RoutingserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
