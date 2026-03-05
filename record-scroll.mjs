import { chromium } from 'playwright';
import path from 'path';

const SITES = [
  { name: 'original', url: 'https://www.davidlangarica.dev/' },
  { name: 'my-site', url: 'http://localhost:3000/en' },
];

const VIEWPORT = { width: 1440, height: 900 };
const SCROLL_STEP = 300;
const SCROLL_DELAY = 120;

async function recordSite({ name, url }) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    recordVideo: {
      dir: path.resolve('videos'),
      size: VIEWPORT,
    },
  });

  const page = await context.newPage();
  console.log(`Recording ${name}: ${url}`);

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  } catch {
    await page.goto(url, { waitUntil: 'load', timeout: 30000 });
  }

  // Wait for page to settle
  await page.waitForTimeout(3000);

  // Get total scrollable height
  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = VIEWPORT.height;
  let currentScroll = 0;

  // Smooth scroll down
  while (currentScroll < scrollHeight - viewportHeight) {
    currentScroll += SCROLL_STEP;
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), currentScroll);
    await page.waitForTimeout(SCROLL_DELAY);
  }

  // Pause at bottom
  await page.waitForTimeout(2000);

  // Scroll back up
  while (currentScroll > 0) {
    currentScroll -= SCROLL_STEP * 2;
    if (currentScroll < 0) currentScroll = 0;
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), currentScroll);
    await page.waitForTimeout(80);
  }

  await page.waitForTimeout(1500);

  // Close to finalize video
  const videoPath = await page.video().path();
  await context.close();
  await browser.close();

  console.log(`  -> Saved: ${videoPath}`);
  return videoPath;
}

// Run sequentially
(async () => {
  for (const site of SITES) {
    await recordSite(site);
  }
  console.log('\nDone! Videos saved in ./videos/');
})();
