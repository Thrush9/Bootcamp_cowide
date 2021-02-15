import { browser, by, element, ElementFinder, promise } from 'protractor';

export class RegisterPage {
  // navigate to login page
  navigateToRegister() {
    return browser.get('/registeration');
  }

  navigateToLoginPage() {
    return browser.get('/login');
  }
  // get current URL
  getCurrentURL() {
    return browser.getCurrentUrl();
  }
 
  // get login component
  getRegistrationComponent(): ElementFinder {
    return element(by.tagName('app-registration'));
  }
   // get firstName input box
   getFirstNameInputBox(): ElementFinder {
    return element(by.className('firstName'));
  }
  // check firstName input box is exist or not
  isFirstNameInputBoxPresent(): promise.Promise<boolean> {
    return this.getFirstNameInputBox().isPresent();
  }


   // get lastName input box
   getLastNameInputBox(): ElementFinder {
    return element(by.className('lastName'));
  }
  // check lastName input box is exist or not
  isLastNameInputBoxPresent(): promise.Promise<boolean> {
    return this.getLastNameInputBox().isPresent();
  }


   // get mobileNum input box
   getMobileNumInputBox(): ElementFinder {
    return element(by.className('mobileNum'));
  }
  // check mobileNum input box is exist or not
  isMobileNumInputBoxPresent(): promise.Promise<boolean> {
    return this.getMobileNumInputBox().isPresent();
  }

  
  // get emailId input box
  getEmailIdInputBox(): ElementFinder {
    return element(by.className('emailId'));
  }
  // check emailId input box is exist or not
  isEmailIdInputBoxPresent(): promise.Promise<boolean> {
    return this.getEmailIdInputBox().isPresent();
  }


  // get password input box
  getPasswordInputBox(): ElementFinder {
    return element(by.className('password'));
  }
  // check password input box is exist or not
  isPasswordInputBoxPresent(): promise.Promise<boolean> {
    return this.getPasswordInputBox().isPresent();
  }


   // get confirm password input box
   getConfirmPasswordInputBox(): ElementFinder {
    return element(by.className('cpassword'));
  }
  // check emailId input box is exist or not
  isConfirmPasswordInputBoxPresent(): promise.Promise<boolean> {
    return this.getConfirmPasswordInputBox().isPresent();
  }


  // get register button
  getRegisterButton(): ElementFinder {
    return this.getRegistrationComponent().element(by.buttonText('Register'));
  }
  // check register button is present or not
  isRegisterButtonPresent(): promise.Promise<boolean> {
    return this.getRegisterButton().isPresent();
  }
  // click register button
  clickRegisterButton(): promise.Promise<void> {
    return this.getRegisterButton().click();
  }
  // default values of input boxes
  getRegisterInputBoxesDefaultValues(): any {
    let fname,lname, mobile, email , password, cpassword;
    fname= this.getFirstNameInputBox().getAttribute('value');
    lname= this.getLastNameInputBox().getAttribute('value');
    mobile= this.getMobileNumInputBox().getAttribute('value');
    email = this.getEmailIdInputBox().getAttribute('value');
    password = this.getPasswordInputBox().getAttribute('value');
    cpassword= this.getConfirmPasswordInputBox().getAttribute('value');
    return Promise.all([fname,lname, mobile, email , password, cpassword]).then( (values) => {
      return values;
    });
  }
  // get emailId and password details
  getMockLoginDetail(): any {
    const loginDetail: any = { firstName:'keerthisri', lastName:'tirumala', mobileNum:'7894567894' , emailId: 'admin@gmail.com', password : 'admin123', cpassword:'admin123'};
    return loginDetail;
  }
  // set emailId and password input box values
  addLoginValues(): any {
    const login: any = this.getMockLoginDetail();
    this.getFirstNameInputBox().sendKeys(login.firstName);
    this.getLastNameInputBox().sendKeys(login.lastName);
    this.getMobileNumInputBox().sendKeys(login.mobileNum);
    this.getEmailIdInputBox().sendKeys(login.username);
    this.getPasswordInputBox().sendKeys(login.password);
    this.getConfirmPasswordInputBox().sendKeys(login.cpassword);
    return Object.keys(login).map(key => login[key]);
  }

}
