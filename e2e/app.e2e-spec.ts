import { Start001Page } from './app.po';

describe('start001 App', () => {
  let page: Start001Page;

  beforeEach(() => {
    page = new Start001Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
