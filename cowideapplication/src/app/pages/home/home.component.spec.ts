import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports:[RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Hero-image element', () => {
    let imageObj = fixture.debugElement.query(By.css('.hero-image'));
    expect(imageObj).toBeTruthy();

    let textObj = fixture.debugElement.query(By.css('.hero-text h1'));
    expect(textObj).toBeTruthy();
    expect(textObj.nativeElement.textContent).toEqual('COWIDE Analytics');
  });

  // it('should have Hero-text element', () => {
  //   let textObj = fixture.debugElement.query(By.css('.hero-text h1'));
  //   expect(textObj).toBeTruthy();
  //   expect(textObj.nativeElement.textContent).toEqual('COWIDE Analytics');
  // });

  it('should have World Counts element', () => {
    let countsObj = fixture.debugElement.query(By.css('.worldcount'));
    expect(countsObj).toBeTruthy();

    let confirmedObj = fixture.debugElement.query(By.css('.confirmed'));
    expect(confirmedObj).toBeTruthy();

    let recoveredObj = fixture.debugElement.query(By.css('.recovered'));
    expect(recoveredObj).toBeTruthy();

    let deathsObj = fixture.debugElement.query(By.css('.deaths'));
    expect(deathsObj).toBeTruthy();
  });

  // it('should have Confirmed count element', () => {
  //   let countsObj = fixture.debugElement.query(By.css('.confirmed'));
  //   expect(countsObj).toBeTruthy();
  // });

  // it('should have Recovered count element', () => {
  //   let countsObj = fixture.debugElement.query(By.css('.recovered'));
  //   expect(countsObj).toBeTruthy();
  // });

  // it('should have Death count element', () => {
  //   let countsObj = fixture.debugElement.query(By.css('.deaths'));
  //   expect(countsObj).toBeTruthy();
  // });

  it('should have Prompt Login element', () => {
    let buttonObj = fixture.debugElement.query(By.css('.worldcount .promptlogin'));
    expect(buttonObj).toBeTruthy();
    expect(buttonObj.nativeElement.textContent).toEqual(' Check about your Locality ');
  });

  it('should have AboutUs element', () => {
    let divObj = fixture.debugElement.query(By.css('.aboutus'));
    expect(divObj).toBeTruthy();
    let  textObj = fixture.debugElement.query(By.css('.aboutus h3'));
    expect(textObj.nativeElement.textContent).toEqual('About Us');
  });

  it('should have News element', () => {
    let divObj = fixture.debugElement.query(By.css('.news'));
    expect(divObj).toBeTruthy();
    let  textObj = fixture.debugElement.query(By.css('.news h1'));
    expect(textObj.nativeElement.textContent).toEqual('Latest News');
  });


});
