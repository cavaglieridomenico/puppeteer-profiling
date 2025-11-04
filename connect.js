const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');

let pageForTracing;
let traceCounter = 0;

// Helper function to get the WebSocket endpoint
function getWebSocketEndpoint() {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:9222/json/version', (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const version = JSON.parse(data);
          resolve(version.webSocketDebuggerUrl);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', (err) => {
      reject(new Error(`Cannot connect to the device. Please check if the device is connected and the port forwarding is configured correctly. Details: ${err.message}`));
    });
  });
}

// Function to find the next available trace file number
function getNextTraceNumber() {
    let i = 0;
    while (fs.existsSync(`trace-${i}.json`)) {
        i++;
    }
    return i;
}

(async () => {
  const url = process.argv[2];

  try {
    console.log('Connecting to device...');
    const browserWSEndpoint = await getWebSocketEndpoint();
    console.log('WebSocket endpoint:', browserWSEndpoint);

    const browser = await puppeteer.connect({
      browserWSEndpoint,
      defaultViewport: null,
    });

    console.log('Connected to browser!');

    const pages = await browser.pages();

    if (url) {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        console.error('Invalid URL. Please provide a full URL starting with http:// or https://');
        process.exit(1);
      }
      console.log(`Navigating to ${url}...`);
      pageForTracing = await browser.newPage();
      await pageForTracing.goto(url);
      console.log('Navigation complete.');
    } else if (pages.length > 0) {
        pageForTracing = pages[0];
        console.log(`Using first open page for tracing: ${await pageForTracing.url()}`)
    } else {
        console.log('No open pages. A new page will be created for tracing.');
        pageForTracing = await browser.newPage();
    }

    // Start the command server
    const server = http.createServer(async (req, res) => {
        if (req.url === '/trace:start') {
            if (pageForTracing) {
                traceCounter = getNextTraceNumber();
                const tracePath = `trace-${traceCounter}.json`;
                await pageForTracing.tracing.start({ path: tracePath, screenshots: true });
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`Tracing started. Saving to ${tracePath}\n`);
                console.log(`Tracing started. Saving to ${tracePath}`);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('No page available for tracing.\n');
                console.log('No page available for tracing.');
            }
        } else if (req.url === '/trace:stop') {
            if (pageForTracing) {
                await pageForTracing.tracing.stop();
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`Tracing stopped. File trace-${traceCounter}.json saved.\n`);
                console.log(`Tracing stopped. File trace-${traceCounter}.json saved.`);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('No page available for tracing (was tracing ever started?).\n');
                console.log('No page available for tracing (was tracing ever started?).');
            }
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found. Use /trace:start or /trace:stop\n');
        }
    });

    const PORT = 8080;
    server.listen(PORT, () => {
        console.log(`Command server listening on http://localhost:${PORT}`);
        console.log('  - Send GET to /trace:start to begin tracing.');
        console.log('  - Send GET to /trace:stop to end tracing.');
    });

  } catch (err) {
    console.error('Error connecting to device:', err.message);
    console.error('Please ensure that the adb forward command was successful and that Chrome is running on your device.');
    process.exit(1);
  }
})();
