#!/usr/bin/env node
/**
 * Test password gate flow on GitHub Pages
 */
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = 'https://pashaandreevski.github.io/scalable-ai-assignment';
const OUTPUT = path.join(__dirname, 'password-gate-test-screenshots');
fs.mkdirSync(OUTPUT, { recursive: true });

async function main() {
  // Fresh context - no sessionStorage from previous runs
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage({ viewport: { width: 1280, height: 900 } });

  const report = {
    overlayOnFirstVisit: false,
    wrongPwShowsError: false,
    correctPwUnlocks: false,
    demoPreservesUnlockedState: false,
    demoShoweOverlay: false,
    geminiWorksAfterUnlock: false,
    issues: []
  };

  try {
    // 1. Navigate to index (first visit - no sessionStorage)
    await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(800);

    report.overlayOnFirstVisit = await page.locator('#pwOverlay').isVisible() && !(await page.locator('#pwOverlay').evaluate(el => el.classList.contains('hidden')));
    await page.screenshot({ path: path.join(OUTPUT, '01-initial-overlay.png') });

    if (!report.overlayOnFirstVisit) report.issues.push('Password overlay did not appear on first visit');

    // 2. Type wrong password, click Unlock
    await page.locator('#pwInput').fill('wrongpassword');
    await page.locator('button:has-text("Unlock")').click();
    await page.waitForTimeout(600);

    const pwError = page.locator('#pwError');
    report.wrongPwShowsError = await pwError.isVisible() && await pwError.evaluate(el => el.classList.contains('show'));
    await page.screenshot({ path: path.join(OUTPUT, '02-wrong-password-error.png') });

    if (!report.wrongPwShowsError) report.issues.push('Wrong password did not show error');

    // 3. Clear input, type correct password, Unlock
    await page.locator('#pwInput').fill('');
    await page.locator('#pwInput').fill('scalable2026');
    await page.locator('button:has-text("Unlock")').click();
    await page.waitForTimeout(800);

    const overlayHidden = await page.locator('#pwOverlay').evaluate(el => el.classList.contains('hidden'));
    report.correctPwUnlocks = overlayHidden;
    await page.screenshot({ path: path.join(OUTPUT, '03-unlocked-presentation.png') });

    if (!report.correctPwUnlocks) report.issues.push('Correct password did not unlock');

    // 4. Click Jump to Live Demo
    await page.getByRole('link', { name: /Jump to Live Demo/i }).click();
    await page.waitForURL(/demo\.html/, { timeout: 5000 });
    await page.waitForTimeout(1000);

    // 5. Check if demo shows overlay (should NOT - sessionStorage carries over)
    const demoOverlay = page.locator('#pwOverlay');
    report.demoShoweOverlay = await demoOverlay.isVisible() && !(await demoOverlay.evaluate(el => el.classList.contains('hidden')));
    report.demoPreservesUnlockedState = !report.demoShoweOverlay;

    await page.screenshot({ path: path.join(OUTPUT, '04-demo-after-nav.png') });

    // 6. If overlay appeared, unlock again
    if (report.demoShoweOverlay) {
      await page.locator('#pwInput').fill('scalable2026');
      await page.locator('button:has-text("Unlock")').click();
      await page.waitForTimeout(800);
      report.issues.push('Demo showed password overlay despite sessionStorage - manual unlock required');
    }

    // 7. Scroll to Explore Mode
    await page.locator('#exploreSection').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // 8. Click suggestion chip
    await page.getByText('What ETFs am I invested in?', { exact: true }).click();
    await page.waitForTimeout(5000);

    // 9. Check response - should be AI text, not error or "Please unlock"
    const lastAgentBubble = page.locator('#exploreMessages .msg-row.agent .msg-bubble').last();
    const responseText = await lastAgentBubble.textContent().catch(() => '');

    const hasError = responseText.includes('API error') || responseText.includes('Live AI exploration is currently unavailable');
    const hasUnlockMsg = responseText.includes('Please unlock');
    report.geminiWorksAfterUnlock = !hasError && !hasUnlockMsg && responseText.length > 50;

    if (hasUnlockMsg) report.issues.push('Explore Mode showed "Please unlock" - API key not decrypted');
    if (hasError) report.issues.push('Gemini API returned error after unlock');

    await page.screenshot({ path: path.join(OUTPUT, '05-final-explore-response.png') });

  } catch (err) {
    report.issues.push(`Exception: ${err.message}`);
    await page.screenshot({ path: path.join(OUTPUT, 'error.png') }).catch(() => {});
  } finally {
    await context.close();
    await browser.close();
  }

  console.log('\n=== PASSWORD GATE TEST REPORT ===\n');
  console.log('Password overlay on first visit:', report.overlayOnFirstVisit);
  console.log('Wrong password shows error:', report.wrongPwShowsError);
  console.log('Correct password unlocks:', report.correctPwUnlocks);
  console.log('Demo preserves unlocked state (no overlay):', report.demoPreservesUnlockedState);
  console.log('Demo showed overlay (sessionStorage failed):', report.demoShoweOverlay);
  console.log('Gemini API works after unlock:', report.geminiWorksAfterUnlock);
  if (report.issues.length) {
    console.log('\nIssues:');
    report.issues.forEach(i => console.log('  -', i));
  }
  console.log('\nScreenshots:', OUTPUT);
}

main();
