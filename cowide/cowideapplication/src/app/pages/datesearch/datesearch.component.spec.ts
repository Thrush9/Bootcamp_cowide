import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatesearchComponent } from './datesearch.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

describe('DatesearchComponent', () => {
  let component: DatesearchComponent;
  let fixture: ComponentFixture<DatesearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatesearchComponent ],
      imports:[RouterTestingModule, HttpClientTestingModule, MatSnackBarModule],
      providers:[DatePipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatesearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have World Counts element', () => {
    let countsObj = fixture.debugElement.query(By.css('.worldcases'));
    expect(countsObj).toBeTruthy();
    
    let textObj = fixture.debugElement.query(By.css('.worldcases h2'));
    expect(textObj.nativeElement.textContent).toEqual('World Cases');
  });

  it('should have World Cases bar chart element', () => {
    let countsObj = fixture.debugElement.query(By.css('.worldcounts'));
    expect(countsObj).toBeTruthy();
  });

  it('should have Continent Search card element', () => {
    let cardObj = fixture.debugElement.query(By.css('.searchcard'));
    expect(cardObj).toBeTruthy();
    
    let dropdownObj = fixture.debugElement.query(By.css('.searchdropdown'));
    expect(dropdownObj).toBeTruthy();
    
    let buttonObj = fixture.debugElement.query(By.css('.searchbtn'));
    expect(buttonObj.nativeElement.textContent).toEqual('Search');
  });

  it('should have Continent Counts element', () => {
    let countsObj = fixture.debugElement.query(By.css('.continentcases'));
    expect(countsObj).toBeTruthy();
    
    let textObj = fixture.debugElement.query(By.css('.continentcases h2'));
    expect(textObj.nativeElement.textContent).toEqual('Continent Cases');
  });

  it('should have Continent Cases line chart element', () => {
    let countsObj = fixture.debugElement.query(By.css('.continentcounts'));
    expect(countsObj).toBeTruthy();
  });

  it('should have Country Search card element', () => {
    let cardObj = fixture.debugElement.query(By.css('.searchcoutrycard'));
    expect(cardObj).toBeTruthy();
    
    let dropdownObj = fixture.debugElement.query(By.css('.searchinput'));
    expect(dropdownObj).toBeTruthy();
    
    let buttonObj = fixture.debugElement.query(By.css('.searchcountrybtn'));
    expect(buttonObj.nativeElement.textContent).toEqual('Search');
  });

  it('should have Country Counts element', () => {
    let countsObj = fixture.debugElement.query(By.css('.countrycases'));
    expect(countsObj).toBeTruthy();
    
    let textObj = fixture.debugElement.query(By.css('.countrycases h2'));
    expect(textObj.nativeElement.textContent).toEqual('Country Cases');
  });

  it('should have Country Cases bar chart element', () => {
    let countsObj = fixture.debugElement.query(By.css('.countrycounts'));
    expect(countsObj).toBeTruthy();
  });

});
