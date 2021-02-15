import { browser, by, element, ElementFinder, promise } from 'protractor';

export class AppPage {
  // async navigateTo(): Promise<unknown> {
  //   return browser.get(browser.baseUrl);
  // }

  // async getTitleText(): Promise<string> {
  //   return element(by.css('app-root .content span')).getText();
  // }

   // navigate to home page
   navigateTo() {
    return browser.get('/');
  }
  // get header
  getHeader(): ElementFinder {
    return element(by.css('mat-toolbar'));
  }
  // check header is present or not
  isHeaderPresent(): promise.Promise<boolean> {
    return this.getHeader().isPresent();
  }

  getLogoImage(): ElementFinder {
    return element(by.css('hero-image'));
  }
  
  isLogoPresent(): promise.Promise<boolean> {
    return this.getLogoImage().isPresent();
  }
}
