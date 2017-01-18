import { GamesDirectoryPage } from './app.po';

describe('games-directory App', function() {
  let page: GamesDirectoryPage;

  beforeEach(() => {
    page = new GamesDirectoryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
