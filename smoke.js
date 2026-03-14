const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

const DEFAULT_PROGRESS_FILES = [
  'Coast_Cave.decals',
  'Coast_Cave.fow',
  'Coast_Village.decals',
  'Coast_Village.fow',
  'Coast_Village.pins',
  'Coast.decals',
  'Coast.fow',
  'customAva.png',
  'dh.dat',
  'entities.dat',
  'info.dat',
  'player.dat',
  'save.dat',
  'Screenshot.png',
  'WorldMap.wmap'
];

function existingFiles(dir, names) {
  return names.map((name) => path.resolve(dir, name)).filter((file) => fs.existsSync(file));
}

async function run() {
  const editorUrl = process.env.SMOKE_URL || pathToFileURL(path.resolve(__dirname, 'index.html')).href;
  const archiveFile = process.env.SMOKE_ARCHIVE_FILE || '';
  const progressDir = process.env.SMOKE_PROGRESS_DIR || '';
  const screenshotDir = process.env.SMOKE_SCREENSHOT_DIR || __dirname;

  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1400 } });
  const messages = [];
  page.on('pageerror', (err) => messages.push(`PAGEERROR ${err.message}`));
  page.on('console', (msg) => messages.push(`CONSOLE ${msg.type()} ${msg.text()}`));

  await page.goto(editorUrl, { waitUntil: 'networkidle' });

  let archiveStatus = null;
  let archiveSource = null;
  let archiveRecords = null;
  if (archiveFile && fs.existsSync(archiveFile)) {
    await page.setInputFiles('#archiveInput', archiveFile);
    await page.waitForTimeout(1800);
    archiveStatus = await page.textContent('#status');
    archiveSource = await page.textContent('#sourceLabel');
    archiveRecords = await page.locator('#recordList .record-item').count();
    await page.screenshot({ path: path.resolve(screenshotDir, 'archive-smoke.png'), fullPage: true });
  }

  await page.click('button[data-view="records"]');
  await page.waitForTimeout(250);
  await page.fill('#recordSearch', 'quest');
  await page.waitForTimeout(250);

  let progressStatus = null;
  let progressSource = null;
  let progressRecords = null;
  if (progressDir && fs.existsSync(progressDir)) {
    const progressFiles = existingFiles(progressDir, DEFAULT_PROGRESS_FILES);
    if (progressFiles.length > 0) {
      await page.setInputFiles('#progressInput', progressFiles);
      await page.waitForTimeout(2200);
      progressStatus = await page.textContent('#status');
      progressSource = await page.textContent('#sourceLabel');
      progressRecords = await page.locator('#recordList .record-item').count();
      await page.click('button[data-view="maps"]');
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.resolve(screenshotDir, 'progress-smoke.png'), fullPage: true });
    }
  }

  console.log(
    JSON.stringify(
      {
        editorUrl,
        archiveFile: archiveFile || null,
        progressDir: progressDir || null,
        archiveStatus,
        archiveSource,
        archiveRecords,
        progressStatus,
        progressSource,
        progressRecords,
        messages
      },
      null,
      2
    )
  );
  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
