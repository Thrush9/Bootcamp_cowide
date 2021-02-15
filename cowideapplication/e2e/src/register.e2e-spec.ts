import { RegisterPage } from './register.po';

describe('COWIDE App - Register Page', () => {
  let page: RegisterPage ;

  beforeEach(() => {
    page = new RegisterPage();
  });

  it('should get firstName input box', () => {
    page.navigateToRegister();
    expect(page.isFirstNameInputBoxPresent())
    .toBeTruthy();
  });
  
  it('should get lastName input box', () => {
    page.navigateToRegister();
    expect(page.isLastNameInputBoxPresent())
    .toBeTruthy();
  });

  it('should get mobile input box', () => {
    page.navigateToRegister();
    expect(page.isMobileNumInputBoxPresent())
    .toBeTruthy();
  });


  it('should get emailId input box', () => {
    page.navigateToRegister();
    expect(page.isEmailIdInputBoxPresent())
    .toBeTruthy();
  });


  it('should get passsword input box', () => {
    page.navigateToRegister();
    expect(page.isPasswordInputBoxPresent())
    .toBeTruthy();
  });

  it('should get cpassword input box', () => {
    page.navigateToRegister();
    expect(page.isConfirmPasswordInputBoxPresent())
    .toBeTruthy();
  });

  it('should get register button', () => {
    page.navigateToRegister();
    expect(page.isRegisterButtonPresent()).toBeTruthy();
  });

  it('default values of registration form should be empty', () => {
    const emptyValues = ['', '', '', '', '',''];
    page.navigateToRegister();
    expect(page.getRegisterInputBoxesDefaultValues()).toEqual(emptyValues, 'Default values for registration form should be empty');
  });

  it('should register into the system', () => {
    page.navigateToRegister();
    let credentials = page.addLoginValues();
    expect(page.getRegisterInputBoxesDefaultValues()).toEqual(credentials, 'Should be able to set values for registration form');
    page.clickRegisterButton();
    page.navigateToLoginPage();
    page.getCurrentURL().then((url) => {
      if (url.indexOf('login') > -1) {
        credentials = page.addLoginValues();
        page.clickRegisterButton();
        page.navigateToLoginPage();
        expect(page.getCurrentURL()).toContain('login', 'Should navigate to login page');
      } else {
        expect(page.getCurrentURL()).toContain('login', 'Should navigate to login page');
      }
    });
  });
});
