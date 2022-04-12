import puppeteer from 'puppeteer';

describe('Feature: show/hide event details', () => {
  let browser;
  let page;
  // jest.setTimeout(50000); // Necessary when setting headless: false

  beforeAll(async () => {
    /** Uncomment to watch in Chromium browser */
    // browser = await puppeteer.launch({
    //   headless: false,
    //   slowMo: 250, // slow down by 250ms
    //   ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
    // });
    browser = await puppeteer.launch();
    page = await browser.newPage();

    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event'); // Wait that event component to be loaded
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .event-details'); // use $ to return the first element with the given name
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .showDetails-button');

    const eventDetails = await page.$('.event .event-details'); // use $ to return the first element with the given name
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event ot hide ites details', async () => {
    await page.click('.event .hideDetails-button');

    const eventDetails = await page.$('.event .event-details'); // use $ to return the first element with the given name
    expect(eventDetails).toBeNull();
  });

  afterAll(() => {
    browser.close();
  });
});