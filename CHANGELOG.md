# CHANGELOG

## 2025-11-04

### Added

*   `connect.js`: Initial script to connect Puppeteer to a remote Chrome instance on an Android device.
    *   Automatically discovers the WebSocket endpoint for connection.
    *   Includes an HTTP command server (on port 8080) to control tracing.
    *   Supports `trace:start` and `trace:stop` commands via HTTP endpoints.
    *   Saves trace files with progressive numbering (e.g., `trace-0.json`).
    *   Added support for "mobile" and "desktop" modes:
        *   "mobile" mode connects to a Chrome instance on an Android device.
        *   "desktop" mode launches a local Chrome instance (previously Incognito).
*   `package.json`: Added `trace:start` and `trace:stop` npm scripts for convenience.
    *   Updated `package.json` with `start:mobile` and `start:desktop` scripts.
*   `.gitignore`: Added to ignore `node_modules/` and `trace-*.json` files.
*   `README.md`: Comprehensive guide for project setup, usage, and troubleshooting.
    *   Updated `README.md` to reflect "mobile" and "desktop" mode usage.
