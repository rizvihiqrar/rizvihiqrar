// Refreshes the screenshots in images/ from the live pages. Run weekly by
// .github/workflows/screenshots.yml; same size as the originals (1200×750 at 1.5×).
import { chromium } from 'playwright';

const PAGES = {
  dashboard: 'https://rizvihiqrar.github.io/qa-automation-platform/',
  traceability: 'https://rizvihiqrar.github.io/qa-automation-platform/reports/traceability/',
};

const browser = await chromium.launch();
for (const [name, url] of Object.entries(PAGES)) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 750 }, deviceScaleFactor: 1.5 });
  const res = await page.goto(url, { waitUntil: 'networkidle' });
  // Keep the old picture rather than publish an error page.
  if (!res?.ok()) throw new Error(`${url} answered ${res?.status()}`);
  await page.screenshot({ path: `images/${name}.png` });
  console.log(`images/${name}.png from ${url}`);
}
await browser.close();
