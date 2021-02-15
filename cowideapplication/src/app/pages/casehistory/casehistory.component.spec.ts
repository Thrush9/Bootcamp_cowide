import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CasehistoryComponent } from './casehistory.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

describe('CasehistoryComponent', () => {
  let component: CasehistoryComponent;
  let fixture: ComponentFixture<CasehistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasehistoryComponent ],
      imports:[RouterTestingModule, HttpClientTestingModule, MatSnackBarModule],
      providers:[DatePipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Search card element', () => {
    let cardObj = fixture.debugElement.query(By.css('.searchcard'));
    expect(cardObj).toBeTruthy();
    
    let dropdownObj = fixture.debugElement.query(By.css('.searchdropdown'));
    expect(dropdownObj).toBeTruthy();
    
    let inputObj = fixture.debugElement.query(By.css('.searchinput'));
    expect(inputObj).toBeTruthy();
    
    let dateObj = fixture.debugElement.query(By.css('.searchdatepicker'));
    expect(dateObj).toBeTruthy();
    
    let buttonObj = fixture.debugElement.query(By.css('.searchbtn'));
    expect(buttonObj.nativeElement.textContent).toEqual('Search');
  });

  it('should have display card element', () => {
    let cardObj = fixture.debugElement.query(By.css('.adminDashboardCard'));
    expect(cardObj).toBeTruthy();
    
    let titleObj = fixture.debugElement.query(By.css('.adminDashboardCard-title'));
    expect(titleObj).toBeTruthy();
    
    let confirmedObj = fixture.debugElement.query(By.css('.confirmed p'));
    expect(confirmedObj).toBeTruthy();
    expect(confirmedObj.nativeElement.textContent).toEqual('Confirmed Cases');
    
    let recoveredObj = fixture.debugElement.query(By.css('.recovered p'));
    expect(recoveredObj).toBeTruthy();
    expect(recoveredObj.nativeElement.textContent).toEqual('Recovered Cases');
    
    let deathsObj = fixture.debugElement.query(By.css('.deaths p'));
    expect(deathsObj).toBeTruthy();
    expect(deathsObj.nativeElement.textContent).toEqual('Death Cases');
  });

  it('should have WolrdCount Table  element', () => {
    let cardObj = fixture.debugElement.query(By.css('.worldcases'));
    expect(cardObj).toBeTruthy();
    
    let confirmedObj = fixture.debugElement.query(By.css('.worldcases h3'));
    expect(confirmedObj).toBeTruthy();
    expect(confirmedObj.nativeElement.textContent).toEqual('World Cases');

    let titleObj = fixture.debugElement.query(By.css('.worldtable'));
    expect(titleObj).toBeTruthy();
  }); 
  
  it('should have Continent Search card element', () => {
    let cardObj = fixture.debugElement.query(By.css('.searchContinentcard'));
    expect(cardObj).toBeTruthy();
    
    let dateObj = fixture.debugElement.query(By.css('.searchdatepicker'));
    expect(dateObj).toBeTruthy();
    
    let buttonObj = fixture.debugElement.query(By.css('.searchcontinentbtn'));
    expect(buttonObj.nativeElement.textContent).toEqual('Search');
  });

  it('should have ContinentCount Table  element', () => {
    let cardObj = fixture.debugElement.query(By.css('.continentcases'));
    expect(cardObj).toBeTruthy();
    
    let confirmedObj = fixture.debugElement.query(By.css('.continentcases h3'));
    expect(confirmedObj).toBeTruthy();
    expect(confirmedObj.nativeElement.textContent).toEqual('Continent Cases');

    let titleObj = fixture.debugElement.query(By.css('.continenttable'));
    expect(titleObj).toBeTruthy();
  });

  it('should have Country Search card element', () => {
    let cardObj = fixture.debugElement.query(By.css('.searchCountrycard'));
    expect(cardObj).toBeTruthy();
    
    let dateObj = fixture.debugElement.query(By.css('.searchdatepicker'));
    expect(dateObj).toBeTruthy();
    
    let buttonObj = fixture.debugElement.query(By.css('.searchcountrybtn'));
    expect(buttonObj.nativeElement.textContent).toEqual('Search');
  });
  
  it('should have CountryCount Table  element', () => {
    let cardObj = fixture.debugElement.query(By.css('.countrycases'));
    expect(cardObj).toBeTruthy();
    
    let confirmedObj = fixture.debugElement.query(By.css('.countrycases h3'));
    expect(confirmedObj).toBeTruthy();
    expect(confirmedObj.nativeElement.textContent).toEqual('Country Cases');

    let titleObj = fixture.debugElement.query(By.css('.countrytable'));
    expect(titleObj).toBeTruthy();
  });


});


