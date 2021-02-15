import { browser, by, element, ElementFinder, promise } from 'protractor';

export class LoginPage {
  // navigate to login page
  navigateToLogin() {
    return browser.get('/login');
  }

  navigateToLandingPage() {
    return browser.get('/landingpage');
  }

  navigateToCaseHistory() {
    return browser.get('/casehistory');
  }

  navigateToContinentSearch() {
    return browser.get('/continentsearch');
  }

  navigateToCountrySearch() {
    return browser.get('/countrysearch');
  }

  navigateToDateSearch() {
    return browser.get('/datesearch');
  }

  // get current URL
  getCurrentURL() {
    return browser.getCurrentUrl();
  }
 
  // get login component
  getloginComponent(): ElementFinder {
    return element(by.tagName('app-login'));
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
  // get login button
  getLoginButton(): ElementFinder {
    return this.getloginComponent().element(by.buttonText('Login'));
  }
  // check login button is present or not
  isLoginButtonPresent(): promise.Promise<boolean> {
    return this.getLoginButton().isPresent();
  }
  // click login button
  clickLoginButton(): promise.Promise<void> {
    return this.getLoginButton().click();
  }
  // default values of input boxes
  getLoginInputBoxesDefaultValues(): any {
    let inputUsername, inputPassword;
    inputUsername = this.getEmailIdInputBox().getAttribute('value');
    inputPassword = this.getPasswordInputBox().getAttribute('value');
    return Promise.all([inputUsername, inputPassword]).then( (values) => {
      return values;
    });
  }
  // get emailId and password details
  getMockLoginDetail(): any {
    const loginDetail: any = { emailId: 'admin123@gmail.com', password : 'admin123'};
    return loginDetail;
  }
  // set emailId and password input box values
  addLoginValues(): any {
    const login: any = this.getMockLoginDetail();
    this.getEmailIdInputBox().sendKeys(login.username);
    this.getPasswordInputBox().sendKeys(login.password);
    return Object.keys(login).map(key => login[key]);
  }

   // get landingpage component
   getLandingComponent(): ElementFinder {
    return element(by.tagName('app-landing'));
  }

  // get mark button
  getMarkButton(): ElementFinder {
    return this.getLandingComponent().element(by.buttonText('Mark'));
  }

     // check mark button is present or not
  isMarkButtonPresent(): promise.Promise<boolean> {
    return this.getMarkButton().isPresent();
  }

   // click mark button
   clickMarkButton(): promise.Promise<void> {
    return this.getMarkButton().click();
  }


  getHeaderElement() : ElementFinder{
    return element (by.css('app-header'));
  }

  getTitle(): ElementFinder {
    return this.getHeaderElement().element(by.className('worldwidecases'));
  }


  isTitleAvailable(): promise.Promise<boolean> {
    return this.getTitle().isPresent();
  }

  getWorldCountElement() : ElementFinder{
    return element (by.className('totalcount'));
  } 

  isLandingPageElementAvailable() : promise.Promise<boolean>{
    return this.getWorldCountElement().isPresent();
  }

  
  // isContinentTitleAvailable(): promise.Promise<boolean> {
  //   return this.getContinentTitle().isPresent();
  // }

  
  // getContinentTitle(): ElementFinder {
  //   return this.getHeaderElement().element(by.className('continenttitle'));
  // }

}
