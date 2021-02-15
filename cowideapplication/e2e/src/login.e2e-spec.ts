import { LoginPage } from './login.po';

describe('COWIDE App - Login Page', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('should get emailId input box', () => {
    page.navigateToLogin();
    expect(page.isEmailIdInputBoxPresent())
    .toBeTruthy();
  });

  it('should get passsword input box', () => {
    page.navigateToLogin();
    expect(page.isPasswordInputBoxPresent())
    .toBeTruthy();
  });

  it('should get login button', () => {
    page.navigateToLogin();
    expect(page.isLoginButtonPresent()).toBeTruthy();
  });

  it('default values of emailId and password should be empty', () => {
    const emptyLoginValues = ['', ''];
    page.navigateToLogin();
    expect(page.getLoginInputBoxesDefaultValues()).toEqual(emptyLoginValues, 'Default values for emailId and password should be empty');
  });

  it('should login into the system', () => {
    page.navigateToLogin();
    let credentials = page.addLoginValues();
    expect(page.getLoginInputBoxesDefaultValues()).toEqual(credentials, 'Should be able to set values for emailId and password');
    page.clickLoginButton();
    page.navigateToLandingPage();
    page.getCurrentURL().then((url) => {
      if (url.indexOf('login') > -1) {
        credentials = page.addLoginValues();
        page.clickLoginButton();
        page.navigateToLandingPage();
        expect(page.getCurrentURL()).toContain('landingpage', 'Should navigate to landing page');
      } else {
        expect(page.getCurrentURL()).toContain('landingpage', 'Should navigate to landing page');
      }
    });
  });

  it('should get mark button', () => {
    page.navigateToLandingPage();
     expect(page.isMarkButtonPresent()).toBeTruthy();
   });
 
   it('should check for title',()=>{
     page.navigateToLandingPage();
     expect(page.isTitleAvailable()).toBeTruthy();
   });

  it('should navigate to case history search', async () => {
    page.navigateToCaseHistory();
    expect(page.getCurrentURL()).toContain("/casehistory");
  });

  it('should check continent search', async () => {
     page.navigateToContinentSearch();
    expect(page.getCurrentURL()).toContain("/continentsearch");
  });

   it('should check country search', async () => {
   page.navigateToCountrySearch();
     expect(page.getCurrentURL()).toContain("/countrysearch");
   });

   it('should check date search', async () => {
    page.navigateToDateSearch();
     expect(page.getCurrentURL()).toContain("/datesearch");
   });

  //  it('should check world count items', () => {
  //   const list = element.all(By.className('totalcount'));
  //   expect(list.count()).toContain(3);
  // });

  // it('should check all count items', () => {
  //   const list = element.all(By.className('jumbotron'));
  //   expect(list.count()).toContain(3);
  // });

  // it('should check for continent title',()=>{
  //   page.navigateToLandingPage();
  //   expect(page.isContinentTitleAvailable()).toBeTruthy();
  // });

 
  // it('should check continent card count items', () => {
  //   const list = element.all(By.className('adminDashboardcard-body'));
  //   expect(list.count()).toContain(4);
  // });



});
