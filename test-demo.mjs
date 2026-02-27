#!/usr/bin/env node
/**
 * Playwright test script for demo.html
 * Run: npx playwright test test-demo.mjs --project=chromium
 * Or: node test-demo.mjs (uses playwright programmatically)
 */
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEMO_URL = `file://${path.join(__dirname, 'demo.html')}`;
const SCREENSHOTS_DIR = path.join(__dirname, 'demo-screenshots');

async function main() {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.setDefaultTimeout(10000);

    const issues = [];
    const jsErrors = [];
    page.on('pageerror', err => jsErrors.push(err.toString()));

  try {
    // 1. Navigate and initial screenshot
    await page.goto(DEMO_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01-initial.png') });

    // 2. Verify Before/After section
    const baSection = await page.$('.ba-section');
    const baBoxes = await page.$$('.ba-box');
    if (!baSection) issues.push('Before/After section (.ba-section) not found');
    if (baBoxes.length !== 2) issues.push(`Expected 2 .ba-box elements, found ${baBoxes.length}`);

    // 3. Click Next through the guided demo
    const nextBtn = page.locator('#nextBtn');
    const stepInfo = page.locator('#stepInfo');
    const chatMessages = page.locator('#chatMessages');
    const traceLog = page.locator('#traceLog');

    for (let i = 0; i < 3; i++) {
      await nextBtn.click();
      await page.waitForTimeout(800); // Wait for typing anim, traces
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `02-step-${i + 1}.png`) });
    }

    // Verify chat has messages
    const msgCount = await chatMessages.locator('.msg-row').count();
    if (msgCount < 2) issues.push(`After 3 clicks: expected messages, got ${msgCount}`);

    // Verify trace panel updated
    const traceCount = await traceLog.locator('.trace-entry').count();
    if (traceCount === 0) issues.push('Compliance trace panel has no entries after steps');

    // Continue through demo - when action buttons appear, click one then Next
    for (let i = 0; i < 12; i++) {
      const btn = page.locator('#nextBtn');
      const text = await btn.textContent();
      if (text.includes('Complete')) break;
      // Wait for button to be enabled (disabled during step animations ~1s)
      try {
        await page.waitForFunction(
          () => document.getElementById('nextBtn') && !document.getElementById('nextBtn').disabled,
          { timeout: 8000 }
        );
      } catch (e) {
        const t = await btn.textContent();
        if (t.includes('Complete')) break;
        issues.push(`Next button stayed disabled at loop ${i}: ${e.message}`);
        break;
      }
      await page.waitForTimeout(200);
      // If action buttons visible and not faded, click first (user selects option)
      const firstAction = page.locator('.action-btn').first();
      if (await firstAction.count() > 0) {
        const isFaded = await firstAction.evaluate(el =>
          el.style.opacity === '0.4' || el.style.pointerEvents === 'none');
        if (!isFaded) {
          await firstAction.click();
          await page.waitForTimeout(500);
        }
      }
      await btn.click();
      await page.waitForTimeout(100);
    }

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03-demo-progress.png') });

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '04-demo-complete.png') });

    // Check metrics card
    const metricsCard = page.locator('#metricsCard');
    const metricsShowing = await metricsCard.evaluate(el => el.classList.contains('show'));

    // 4. Scroll to Explore Mode
    await page.locator('#exploreSection').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '05-explore-section.png') });

    // 5. Click suggestion chip (Gemini API - may fail/timeout)
    const chip = page.locator('.suggestion-chip').first();
    await chip.click();
    await page.waitForTimeout(4000); // Wait for API or error fallback

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '06-after-chip-click.png') });

    if (!metricsShowing && (await nextBtn.textContent()).includes('Complete')) {
      issues.push('Metrics card not visible when demo marked complete');
    }

    console.log('\n=== DEMO TEST REPORT ===\n');
    console.log('Screenshots saved to:', SCREENSHOTS_DIR);
    if (issues.length > 0) {
      console.log('\nISSUES FOUND:');
      issues.forEach(i => console.log('  -', i));
    } else {
      console.log('\nNo critical issues found.');
    }
    if (jsErrors.length > 0) {
      console.log('\nJavaScript errors:', jsErrors);
    }
    console.log('\nStep info final:', await stepInfo.textContent());
    console.log('Chat messages:', await chatMessages.locator('.msg-row').count());
    console.log('Trace entries:', await traceLog.locator('.trace-entry').count());

  } catch (err) {
    console.error('Test error:', err);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'error.png') });
    issues.push(`Exception: ${err.message}`);
  } finally {
    await browser.close();
  }

  return issues;
}

main().then(issues => process.exit(issues && issues.length > 0 ? 1 : 0));
