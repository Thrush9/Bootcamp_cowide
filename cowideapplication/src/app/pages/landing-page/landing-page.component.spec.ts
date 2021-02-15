import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LandingPageComponent } from './landing-page.component';
import { By } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageComponent ],
      imports:[RouterTestingModule, HttpClientTestingModule,MatSnackBarModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Total Counts element', () => {
    let countsObj = fixture.debugElement.query(By.css('.totalcount'));
    expect(countsObj).toBeTruthy();
    
    let textObj = fixture.debugElement.query(By.css('.totalcount h2'));
    expect(textObj.nativeElement.textContent).toEqual('World Wide Cases Mark');

    let confirmedObj = fixture.debugElement.query(By.css('.confirmedcount'));
    expect(confirmedObj).toBeTruthy();

    let recoveredObj = fixture.debugElement.query(By.css('.recoveredcount'));
    expect(recoveredObj).toBeTruthy();

    let deathsObj = fixture.debugElement.query(By.css('.deathscount'));
    expect(deathsObj).toBeTruthy();
  });

  // it('should have Confirmed count element', () => {
  //   let countsObj = fixture.debugElement.query(By.css('.confirmedcount'));
  //   expect(countsObj).toBeTruthy();
  // });

  // it('should have Recovered count element', () => {
  //   let countsObj = fixture.debugElement.query(By.css('.recoveredcount'));
  //   expect(countsObj).toBeTruthy();
  // });

  // it('should have Death count element', () => {
  //   let countsObj = fixture.debugElement.query(By.css('.deathscount'));
  //   expect(countsObj).toBeTruthy();
  // });

  it('should have Confirmed pie chart element', () => {
    let countsObj = fixture.debugElement.query(By.css('.confirmedpie'));
    expect(countsObj).toBeTruthy();
  });

  it('should have Confirmed Bar chart element', () => {
    let countsObj = fixture.debugElement.query(By.css('.confirmedbar'));
    expect(countsObj).toBeTruthy();
  });

  it('should have Recovered pie chart element', () => {
    let countsObj = fixture.debugElement.query(By.css('.recoveredpie'));
    expect(countsObj).toBeTruthy();
  });

  it('should have Recovered Bar chart element', () => {
    let countsObj = fixture.debugElement.query(By.css('.recoveredbar'));
    expect(countsObj).toBeTruthy();
  });

  it('should have Deaths pie chart element', () => {
    let countsObj = fixture.debugElement.query(By.css('.deathspie'));
    expect(countsObj).toBeTruthy();
  });

  it('should have Deaths Bar chart element', () => {
    let countsObj = fixture.debugElement.query(By.css('.deathsbar'));
    expect(countsObj).toBeTruthy();
  });

  it('should have Continents Counts element', () => {
    let countsObj = fixture.debugElement.query(By.css('.continents'));
    expect(countsObj).toBeTruthy();
    
    let textObj = fixture.debugElement.query(By.css('.continents h2'));
    expect(textObj.nativeElement.textContent).toEqual('Continental Analysis');
  });

});
