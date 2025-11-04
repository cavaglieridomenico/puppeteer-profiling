# Puppeteer Profiling on Android

This project provides a setup to connect Puppeteer to a Chrome instance running on an Android device, allowing for remote debugging and performance tracing.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js and npm:** [Download and install Node.js](https://nodejs.org/en/download/)
*   **Android Debug Bridge (ADB):** Part of the Android SDK Platform-Tools. Ensure `adb` is accessible in your system's PATH.
*   **A physical Android device:** With USB debugging enabled and connected to your computer.

## Setup

1.  **Clone the repository (if applicable) or navigate to your project directory:**

    ```bash
    cd /path/to/puppeteer-profiling
    ```

2.  **Install Node.js dependencies:**

    ```bash
    npm install
    ```

3.  **Connect your Android device:**

    Ensure your Android device is connected via USB and USB debugging is enabled. Verify it's recognized by ADB:

    ```bash
    adb devices
    ```

    You should see your device listed.

4.  **Forward the Chrome DevTools port:**

    This command forwards the Chrome DevTools port from your Android device to your local machine (port 9222).

    ```bash
    adb forward tcp:9222 localabstract:chrome_devtools_remote
    ```

    Keep this command running in a dedicated terminal or ensure it's executed before starting the `connect.js` script.

## Usage

Once the setup is complete, you can use the `connect.js` script to interact with Chrome on your Android device.

### 1. Start the Puppeteer connection and command server

Run the main script. This will connect Puppeteer to your device and start a local HTTP command server on port `8080`.

```bash
npm start
```

*   If no URL is provided, it will list the currently open tabs on your device.
*   The script will keep the connection alive. To stop it, press `Ctrl+C`.

### 2. Navigate to a specific URL (Optional)

You can instruct the script to open a new tab and navigate to a specific URL on your device:

```bash
npm start -- http://example.com
```

### 3. Control Tracing (from a **second terminal**)

While `npm start` is running in your first terminal, you can use a second terminal to send commands to start and stop performance tracing.

*   **To start a trace:**
    ```bash
    npm run trace:start
    ```

*   **To stop a trace:**
    ```bash
    npm run trace:stop
    ```

Trace files will be saved in your project directory with progressive numbering (e.g., `trace-0.json`, `trace-1.json`).

## Troubleshooting

*   **"Cannot connect to the device" error:**
    *   Ensure your Android device is connected and USB debugging is enabled.
    *   Verify `adb devices` lists your device.
    *   Confirm that `adb forward tcp:9222 localabstract:chrome_devtools_remote` was executed successfully and Chrome is running on your device.
*   **`curl` command not found:** If you are on Windows, you might need to use `Invoke-WebRequest` in PowerShell or install `curl` for Windows.
