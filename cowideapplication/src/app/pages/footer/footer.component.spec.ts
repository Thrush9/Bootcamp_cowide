import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      imports:[RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoud have footer element', () => {
    let footerObj = fixture.debugElement.query(By.css('footer'));
    expect(footerObj).toBeTruthy(); 
  });

  it('shoud have Quicklinks element', () => {
    let ulObj = fixture.debugElement.query(By.css('.quicklinks'));
    expect(ulObj).toBeTruthy(); 
  });

  it('shoud have Media element', () => {
    let ulObj = fixture.debugElement.query(By.css('.news'));
    expect(ulObj).toBeTruthy(); 
  });

  it('shoud have Social Icons element', () => {
    let ulObj = fixture.debugElement.query(By.css('.socialicons'));
    expect(ulObj).toBeTruthy(); 
  });

});
