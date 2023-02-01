import { Handler } from '@netlify/functions';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

/**
 * Generate an OpenGraph image for the page.
 */
export const handler: Handler = async (event, context) => {
  console.log('Starting...');
  const url = new URL(process.env.URL);
  if (event.queryStringParameters) {
    url.search = new URLSearchParams(event.queryStringParameters).toString();
  }
  console.log(url);
  console.log('opening browser...');
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
  console.log('opening page...');
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 640 });
  console.log('going to ', url.toString());
  await page.goto(url.toString(), {
    timeout: 0,
  });
  // console.log('switching to dark theme');
  // await page.$eval('input#theme-dark', (input) => {
  //   input.checked = true;
  //   input.dispatchEvent(new Event('input'));
  // });
  console.log('taking screenshot...');
  const image = await page.screenshot({ type: 'jpeg' });

  console.log('All done!');
  return {
    statusCode: 200,
    body: image.toString('base64'),
    isBase64Encoded: true,
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control':
        'public, immutable, no-transform, s-maxage=31536000, max-age=31536000',
    },
  };
};
