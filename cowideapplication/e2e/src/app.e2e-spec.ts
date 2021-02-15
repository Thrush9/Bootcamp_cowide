import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('COWIDE App - Home Page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', async () => {
    await page.navigateTo();
   // expect(await page.getTitleText()).toEqual('CoWideApp app is running!');
  });

  it('should check mat toolbar on home page', () => {
    page.navigateTo();
    expect(page.isHeaderPresent()).toBeTruthy();
    expect(page.isLogoPresent()).toBeTruthy();
  });

  // it('should checklogo image on home page', () => {
  //   page.navigateTo();
  //   expect(page.isLogoPresent()).toBeTruthy();
  // });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });



});
