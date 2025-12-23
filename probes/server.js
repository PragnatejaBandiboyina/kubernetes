const express = require('express');
const app = express();

let isHealthy = true;  // liveness
let isReady = true;    // readiness

// Liveness probe
app.get('/healthz', (req, res) => {
  if (isHealthy) {
    res.status(200).send('OK');
  } else {
    res.status(500).send('Not Healthy');
  }
});

// Readiness probe
app.get('/ready', (req, res) => {
  if (isReady) {
    res.status(200).send('Ready');
  } else {
    res.status(500).send('Not Ready');
  }
});

// Main app endpoint
app.get('/', (req, res) => {
  res.send('Hello from Node.js probe demo app!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Simulate liveness failure after 30 seconds
setTimeout(() => {
  console.log('Simulating liveness failure...');
  isHealthy = false;
}, 30000);

// Simulate readiness failure after 60 seconds
setTimeout(() => {
  console.log('Simulating readiness failure...');
  isReady = false;
}, 60000);
