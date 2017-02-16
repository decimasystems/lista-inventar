import { InventoryPage } from './app.po';

describe('inventory App', function() {
  let page: InventoryPage;

  beforeEach(() => {
    page = new InventoryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
