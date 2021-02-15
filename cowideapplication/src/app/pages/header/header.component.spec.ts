import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports:[RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should have Mat-tool bar element', () =>{
    let toolbar = fixture.debugElement.query(By.css('mat-toolbar'));
    expect(toolbar).toBeTruthy();
  });

  it('should have logo element', () => {
    let buttonObj = fixture.debugElement.query(By.css('.clslogo'));
    expect(buttonObj).toBeTruthy();
   });

  it('should have title element', () => {
    let titleObj = fixture.debugElement.query(By.css('.heading'));
    expect(titleObj).toBeTruthy();
    expect(titleObj.nativeElement.textContent).toEqual('COWIDE')
   });

  it('should have signin element', () => {
    let buttonObj = fixture.debugElement.query(By.css('.signin'));
    expect(buttonObj).toBeTruthy();
    expect(buttonObj.nativeElement.textContent).toEqual(' Sign In')
   });
  
   it('should have signup element', () => {
    let buttonObj = fixture.debugElement.query(By.css('.signup'));
    expect(buttonObj).toBeTruthy();
    expect(buttonObj.nativeElement.textContent).toEqual(' Sign Up')
   }); 

   it('should have navbar element', () => {
    let navObj = fixture.debugElement.query(By.css('.navbar'));
    expect(navObj).toBeTruthy();
   });

   it('should have dashboard element', () => {
    let buttonObj = fixture.debugElement.query(By.css('.dashboard'));
    expect(buttonObj).toBeTruthy();
    expect(buttonObj.nativeElement.textContent).toEqual(' Dashboard(current)')
   });

   it('should have analysis element', () => {
    let buttonObj = fixture.debugElement.query(By.css('.analysis'));
    expect(buttonObj).toBeTruthy();
    expect(buttonObj.nativeElement.textContent).toEqual(' Analysis ')
   });

   it('should have history element', () => {
    let buttonObj = fixture.debugElement.query(By.css('.casehistory'));
    expect(buttonObj).toBeTruthy();
    expect(buttonObj.nativeElement.textContent).toEqual(' Case History')
   });

   it('should have profile element', () => {
    let buttonObj = fixture.debugElement.query(By.css('.profile'));
    expect(buttonObj).toBeTruthy();
    expect(buttonObj.nativeElement.textContent).toEqual(' User Profile')
   });

   it('should have signout element', () => {
    let buttonObj = fixture.debugElement.query(By.css('.signout'));
    expect(buttonObj).toBeTruthy();
    expect(buttonObj.nativeElement.textContent).toEqual(' Sign Out')
   });

});
