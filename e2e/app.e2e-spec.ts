import { TstNgPage } from './app.po';

describe('tst-ng App', function() {
  let page: TstNgPage;

  beforeEach(() => {
    page = new TstNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
