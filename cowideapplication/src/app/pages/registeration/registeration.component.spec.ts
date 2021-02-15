import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterationComponent } from './registeration.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';

describe('RegisterationComponent', () => {
  let component: RegisterationComponent;
  let fixture: ComponentFixture<RegisterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterationComponent ],
      imports:[RouterTestingModule, HttpClientTestingModule,MatSnackBarModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    component. User .controls.firstName.setValue('');
    component. User .controls.lastName.setValue('');
    component. User .controls.emailId.setValue(''); 
    component. User .controls.password.setValue('');
    component. User .controls.mobileNum.setValue('');
    expect(component. User .valid).toBeFalsy();
  });

  it('checking firstName field validity', () => {
    const firstName = component. User .controls.firstName;
    expect(firstName.valid).toBeFalsy();
    firstName.setValue('');
    expect(firstName.hasError('required')).toBeTruthy();
  });

  it('checking lastName field validity', () => {
    const lastName = component. User .controls.lastName;
    expect(lastName.valid).toBeFalsy();
    lastName.setValue('');
    expect(lastName.hasError('required')).toBeTruthy();
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
 
  });

  it('Check if register button exist or not',()=>{
    let buttonobj=fixture.debugElement.query(By.css("#buttonid"));
    expect(buttonobj).toBeTruthy();
  });
});
