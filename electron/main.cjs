const { app, BrowserWindow } = require("electron");
const path = require("path");
const dotenv = require("dotenv");

const env = dotenv.config();
const DEV_PORT = env.parsed.DEV_PORT || 6981;

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  if (isDev) {
    win.loadURL(`http://localhost:${DEV_PORT}`);
  } else {
    win.loadFile(path.join(__dirname, "../.output/public/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
