# CHANGELOG

## 2025-11-04

### Added

*   `connect.js`: Initial script to connect Puppeteer to a remote Chrome instance on an Android device.
    *   Automatically discovers the WebSocket endpoint for connection.
    *   Includes an HTTP command server (on port 8080) to control tracing.
    *   Supports `trace:start` and `trace:stop` commands via HTTP endpoints.
    *   Saves trace files with progressive numbering (e.g., `trace-0.json`).
*   `package.json`: Added `trace:start` and `trace:stop` npm scripts for convenience.
*   `.gitignore`: Added to ignore `node_modules/` and `trace-*.json` files.
*   `README.md`: Comprehensive guide for project setup, usage, and troubleshooting.
