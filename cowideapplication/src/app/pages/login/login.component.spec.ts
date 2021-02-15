import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[RouterTestingModule, HttpClientTestingModule,MatSnackBarModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    component. User .controls.emailId.setValue(''); 
    component. User .controls.password.setValue('');
    expect(component. User .valid).toBeFalsy();
  });

  it('checking emailId field validity', () => {
    const emailId = component. User .controls.emailId;
    expect(emailId.valid).toBeFalsy();
    emailId.setValue('');
    expect(emailId.hasError('required')).toBeTruthy();
  });
  
  it('checking password field validity', () => {
      const password = component. User .controls.password;
      expect(password.valid).toBeFalsy();
   
      password.setValue('');
      expect(password.hasError('required')).toBeTruthy();
    }
  );

  it('Check if login button exist or not',()=>{
    let buttonobj=fixture.debugElement.query(By.css("#buttonid"));
    expect(buttonobj).toBeTruthy();
  });

});
