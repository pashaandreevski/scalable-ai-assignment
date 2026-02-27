#!/usr/bin/env node
/**
 * Test Explore Mode: chips, typing, API responses, message counter
 */
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEMO_URL = `file://${path.join(__dirname, 'demo.html')}`;
const OUTPUT_DIR = path.join(__dirname, 'explore-test-screenshots');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  const report = {
    apiWorks: false,
    counterLog: [],
    errors: [],
    firstResponse: '',
    secondResponse: '',
    firstHadError: true,
    secondHadError: true
  };
  page.on('pageerror', e => report.errors.push(e.toString()));

  try {
    // 1. Navigate and initial screenshot
    await page.goto(DEMO_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '01-initial.png') });

    // 2. Scroll to Explore Mode
    await page.locator('#exploreSection').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '02-explore-section.png') });

    // 3. Click suggestion chip "What ETFs am I invested in?"
    const chip = page.getByText('What ETFs am I invested in?', { exact: true });
    await chip.click();
    report.counterLog.push({ action: 'after chip click', counter: await page.locator('#exploreCounter').textContent() });

    // 4. Wait 5-8 seconds for Gemini response
    await page.waitForTimeout(6500);

    // Check for typing indicator (should be gone), then for agent response or error
    const agentBubbles = page.locator('#exploreMessages .msg-row.agent .msg-bubble');
    const lastBubble = agentBubbles.last();
    const lastText = await lastBubble.textContent().catch(() => '');
    const hasError = lastText.includes('Live AI exploration is currently unavailable') || lastText.includes('API error');
    report.apiWorks = !hasError && lastText.length > 50;
    report.counterLog.push({ action: 'after first response', counter: await page.locator('#exploreCounter').textContent() });

    await page.screenshot({ path: path.join(OUTPUT_DIR, '03-after-chip-response.png') });

    // 5. Type "What happened to my savings plan?" and send
    const input = page.locator('#exploreInput');
    await input.fill('What happened to my savings plan?');
    await page.locator('#exploreSendBtn').click();
    report.counterLog.push({ action: 'after send click', counter: await page.locator('#exploreCounter').textContent() });

    // 6. Wait 5-8 seconds for response
    await page.waitForTimeout(6500);

    const agentBubbles2 = page.locator('#exploreMessages .msg-row.agent .msg-bubble');
    const lastBubble2 = agentBubbles2.last();
    const lastText2 = await lastBubble2.textContent().catch(() => '');
    const hasError2 = lastText2.includes('Live AI exploration is currently unavailable') || lastText2.includes('API error');
    if (!hasError2 && lastText2.length > 50) report.apiWorks = true;
    report.counterLog.push({ action: 'after second response', counter: await page.locator('#exploreCounter').textContent() });

    await page.screenshot({ path: path.join(OUTPUT_DIR, '04-final.png') });

    // Summary
    report.firstResponse = lastText.substring(0, 200) + (lastText.length > 200 ? '...' : '');
    report.secondResponse = lastText2.substring(0, 200) + (lastText2.length > 200 ? '...' : '');
    report.firstHadError = hasError;
    report.secondHadError = hasError2;

  } catch (err) {
    report.errors.push(err.message);
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'error.png') }).catch(() => {});
  } finally {
    await browser.close();
  }

  // Print report
  console.log('\n=== EXPLORE MODE TEST REPORT ===\n');
  console.log('Gemini API working:', report.apiWorks);
  console.log('First response had error:', report.firstHadError);
  console.log('Second response had error:', report.secondHadError);
  console.log('\nMessage counter behavior:');
  report.counterLog.forEach(l => console.log('  ', l.action, ':', l.counter));
  console.log('\nFirst response preview:', report.firstResponse || '(none)');
  console.log('\nSecond response preview:', report.secondResponse || '(none)');
  if (report.errors.length) console.log('\nErrors:', report.errors);
  console.log('\nScreenshots saved to:', OUTPUT_DIR);

  return report;
}

main();
