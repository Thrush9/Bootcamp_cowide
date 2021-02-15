import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookmarkService } from './bookmark.service';

describe('BookmarkService', () => {
  let service: BookmarkService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(BookmarkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
