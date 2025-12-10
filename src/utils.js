const path = require('path');
const env = process.env.PUPPETEER_ENV;
const envPath = env
  ? path.resolve(process.cwd(), `.env.${env}`)
  : path.resolve(process.cwd(), '.env');

require('dotenv').config({ path: envPath });

const { exec } = require('child_process');
const { getAdbPath } = require('./browser');

function handleTap(res, x, y, message) {
  const adbPath = getAdbPath();
  exec(`${adbPath} shell input tap ${x} ${y}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Failed to execute tap command: ${error.message}\n`);
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`${message}\n`);
    console.log(message);
  });
}

async function handleNavigation(page, url, res) {
  const { PUPPETEER_USERNAME, PUPPETEER_PASSWORD } = process.env;

  if (PUPPETEER_USERNAME && PUPPETEER_PASSWORD) {
    await page.authenticate({
      username: PUPPETEER_USERNAME,
      password: PUPPETEER_PASSWORD,
    });
    console.log('Using authentication credentials from environment variables.');
  }

  await page.goto(url);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Navigated to ${url}.\n`);
  console.log(`Navigated to ${url}.`);
}

module.exports = { handleTap, handleNavigation };
