#!/usr/bin/env node
/**
 * Test GitHub Pages deployment: index + demo pages, navigation, scripted demo
 */
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = 'https://pashaandreevski.github.io/scalable-ai-assignment';
const OUTPUT = path.join(__dirname, 'github-pages-test-screenshots');
fs.mkdirSync(OUTPUT, { recursive: true });

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const report = { issues: [], indexLoads: false, demoLoads: false, navWorks: false, demoWorks: false };

  try {
    // 1. Navigate to index, screenshot
    const r1 = await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 15000 });
    report.indexLoads = r1 && r1.status() < 400;
    if (!report.indexLoads) report.issues.push(`Index failed to load: status ${r1?.status()}`);
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUTPUT, '01-index-loaded.png') });

    // 2. Verify cover section title
    const coverTitle = await page.locator('#cover h1').textContent();
    const titleOk = coverTitle && coverTitle.replace(/\s+/g, ' ').includes('Smart Support Agent') && coverTitle.includes('From FAQ Bot to Client-Aware Copilot');
    if (!titleOk) report.issues.push(`Cover title unexpected: "${coverTitle}"`);

    // 3. Click "Jump to Live Demo →"
    const jumpLink = page.getByRole('link', { name: /Jump to Live Demo/i });
    await jumpLink.click();
    await page.waitForURL(/demo\.html/, { timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(800);
    report.navWorks = page.url().includes('demo.html');
    if (!report.navWorks) report.issues.push('Navigation to demo.html did not work');
    await page.screenshot({ path: path.join(OUTPUT, '02-demo-page.png') });

    // 4. Verify demo loaded
    const demoTitle = await page.title();
    const hasNextBtn = await page.locator('#nextBtn').count() > 0;
    report.demoLoads = page.url().includes('demo.html') && hasNextBtn;
    if (!report.demoLoads) report.issues.push('Demo page missing Next button or wrong URL');

    // 5. Click Next once
    await page.locator('#nextBtn').click();
    await page.waitForTimeout(1200);

    // 6. Screenshot first chat message
    const msgCount = await page.locator('#chatMessages .msg-row').count();
    report.demoWorks = msgCount >= 1;
    if (msgCount < 1) report.issues.push('First chat message did not appear after Next click');
    await page.screenshot({ path: path.join(OUTPUT, '03-after-first-next.png') });

    // 7. Navigate to #exploreSection
    await page.goto(BASE + '/demo.html#exploreSection', { waitUntil: 'networkidle', timeout: 10000 });
    await page.waitForTimeout(500);
    await page.locator('#exploreSection').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // 8. Final screenshot
    await page.screenshot({ path: path.join(OUTPUT, '04-explore-section.png') });

    const exploreVisible = await page.locator('#exploreSection').isVisible();
    if (!exploreVisible) report.issues.push('Explore section not visible after hash navigation');

  } catch (err) {
    report.issues.push(`Exception: ${err.message}`);
    await page.screenshot({ path: path.join(OUTPUT, 'error.png') }).catch(() => {});
  } finally {
    await browser.close();
  }

  console.log('\n=== GITHUB PAGES TEST REPORT ===\n');
  console.log('Index page loads:', report.indexLoads);
  console.log('Demo page loads:', report.demoLoads);
  console.log('Navigation index->demo works:', report.navWorks);
  console.log('Scripted demo (Next) works:', report.demoWorks);
  if (report.issues.length) {
    console.log('\nIssues:');
    report.issues.forEach(i => console.log('  -', i));
  }
  console.log('\nScreenshots:', OUTPUT);
}

main();
