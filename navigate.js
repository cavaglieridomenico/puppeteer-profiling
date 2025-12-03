const http = require('http');
const url = process.argv[2];

if (!url) {
  console.error('Please provide a URL as an argument.');
  process.exit(1);
}

const req = http.get(`http://localhost:8080/navigate:url?url=${encodeURIComponent(url)}`, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(`Response: ${data}`);
  });
});

req.on('error', (err) => {
  console.error(`Error sending navigation command:`, err.message);
});