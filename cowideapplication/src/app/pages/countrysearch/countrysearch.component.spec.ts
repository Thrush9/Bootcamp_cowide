import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CountrysearchComponent } from './countrysearch.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';

describe('CountrysearchComponent', () => {
  let component: CountrysearchComponent;
  let fixture: ComponentFixture<CountrysearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountrysearchComponent ],
      imports:[RouterTestingModule, HttpClientTestingModule, MatSnackBarModule, NgxPaginationModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrysearchComponent);
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
    expect(textObj.nativeElement.textContent).toEqual(' Cases Mark');

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

  it('should have Confirmed tree chart element', () => {
    let countsObj = fixture.debugElement.query(By.css('.confirmedtree'));
    expect(countsObj).toBeTruthy();
  });

  it('should have Confirmed Bar chart element', () => {
    let countsObj = fixture.debugElement.query(By.css('.confirmedbar'));
    expect(countsObj).toBeTruthy();
  });

  it('should have Recovered tree chart element', () => {
    let countsObj = fixture.debugElement.query(By.css('.recoveredtree'));
    expect(countsObj).toBeTruthy();
  });

  it('should have Recovered Bar chart element', () => {
    let countsObj = fixture.debugElement.query(By.css('.recoveredbar'));
    expect(countsObj).toBeTruthy();
  });
  it('should have Deaths tree chart element', () => {
    let countsObj = fixture.debugElement.query(By.css('.deathstree'));
    expect(countsObj).toBeTruthy();
  });

  it('should have Deaths Bar chart element', () => {
    let countsObj = fixture.debugElement.query(By.css('.deathsbar'));
    expect(countsObj).toBeTruthy();
  });

  it('should have Country Counts element', () => {
    let countsObj = fixture.debugElement.query(By.css('.country'));
    expect(countsObj).toBeTruthy();
   
    let textObj = fixture.debugElement.query(By.css('.country h2'));
    expect(textObj.nativeElement.textContent).toEqual('State Analysis');
  });

  it('should have Search card element', () => {
    let cardObj = fixture.debugElement.query(By.css('.searchcard'));
    expect(cardObj).toBeTruthy();
    
    let dropdownObj = fixture.debugElement.query(By.css('.searchinput'));
    expect(dropdownObj).toBeTruthy();
    
    let buttonObj = fixture.debugElement.query(By.css('.searchbtn'));
    expect(buttonObj.nativeElement.textContent).toEqual('Search');
  });
  
});
