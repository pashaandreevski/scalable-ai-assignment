#!/usr/bin/env node
/**
 * Full experience test: scroll through entire presentation + demo flow
 */
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = 'https://pashaandreevski.github.io/scalable-ai-assignment';
const OUTPUT = path.join(__dirname, 'full-experience-screenshots');
fs.mkdirSync(OUTPUT, { recursive: true });

async function screenshot(page, name) {
  await page.screenshot({ path: path.join(OUTPUT, name) });
  console.log('  Screenshot:', name);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  const report = { issues: [], observations: [] };

  try {
    // 1. Navigate, screenshot password gate
    await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(500);
    await screenshot(page, '01-password-gate.png');

    // 2. Unlock
    await page.locator('#pwInput').fill('scalable2026');
    await page.locator('button:has-text("Unlock")').click();
    await page.waitForTimeout(800);
    await screenshot(page, '02-unlocked-presentation.png');

    // 3. Scroll through sections
    const sections = [
      ['#gap', '03-gap-before-after.png'],
      ['#opportunity', '04-opportunity-stats.png'],
      ['#users', '05-users-segments.png'],
      ['#jobs', '06-job-graph.png'],
      ['#risks', '07-risks-table.png'],
      ['#idea', '08-idea-architecture.png'],
      ['#idea', '09-cta-try-demo.png'], // CTA is in idea section
      ['#evaluation', '10-evaluation.png'],
      ['#guardrails', '11-guardrails.png'],
      ['#roadmap', '12-roadmap.png'],
      ['#whyme', '13-why-me.png'],
    ];

    for (const [selector, filename] of sections) {
      await page.locator(selector).first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await screenshot(page, filename);
    }

    // Footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);
    await screenshot(page, '14-footer.png');

    // 5. Click Try the Live Demo (first occurrence in idea section)
    const cta = page.locator('a.btn-primary:has-text("Try the Live Demo")').first();
    await cta.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await cta.click();
    await page.waitForURL(/demo\.html/, { timeout: 5000 });
    await page.waitForTimeout(1000);
    await screenshot(page, '15-demo-loaded.png');

    // 6. Click Next several times
    for (let i = 0; i < 5; i++) {
      const btn = page.locator('#nextBtn');
      if (await btn.isDisabled() && (await btn.textContent()).includes('Complete')) break;
      try {
        await page.waitForFunction(
          () => document.getElementById('nextBtn') && !document.getElementById('nextBtn').disabled,
          { timeout: 3000 }
        );
      } catch { break; }
      const actionBtn = page.locator('.action-btn').first();
      if (await actionBtn.isVisible()) {
        const opacity = await actionBtn.evaluate(el => el.style.opacity);
        if (opacity !== '0.4') {
          await actionBtn.click();
          await page.waitForTimeout(400);
        }
      }
      await btn.click();
      await page.waitForTimeout(1000);
    }
    await screenshot(page, '16-demo-chat-trace-actions.png');

    // 7. Click through to completion
    for (let i = 0; i < 15; i++) {
      const btn = page.locator('#nextBtn');
      if (await btn.isDisabled() && (await btn.textContent()).includes('Complete')) break;
      try {
        await page.waitForFunction(
          () => document.getElementById('nextBtn') && !document.getElementById('nextBtn').disabled,
          { timeout: 4000 }
        );
      } catch { break; }
      const actionBtn = page.locator('.action-btn').first();
      if (await actionBtn.isVisible()) {
        const opacity = await actionBtn.evaluate(el => el.style.opacity);
        if (opacity !== '0.4') {
          await actionBtn.click();
          await page.waitForTimeout(400);
        }
      }
      await btn.click();
      await page.waitForTimeout(800);
    }
    await page.waitForTimeout(500);
    await screenshot(page, '17-demo-metrics-card.png');

    // 8. Scroll to explore mode, screenshot fallback state
    await page.locator('#exploreSection').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.locator('.suggestion-chip').first().click();
    await page.waitForTimeout(3000); // Wait for API response (403 fallback)
    await screenshot(page, '18-explore-fallback.png');

  } catch (err) {
    report.issues.push(`Exception: ${err.message}`);
    await page.screenshot({ path: path.join(OUTPUT, 'error.png') }).catch(() => {});
  } finally {
    await context.close();
    await browser.close();
  }

  console.log('\n=== FULL EXPERIENCE TEST COMPLETE ===');
  console.log('Screenshots saved to:', OUTPUT);
  if (report.issues.length) console.log('Issues:', report.issues);
}

main();
