import { app, BrowserWindow, ipcMain, protocol } from "electron";
import path from "node:path";
import fs from "fs";
import Store from "electron-store";
import { fileURLToPath } from "node:url";

import "dotenv/config";

// __dirname definition (ESM compliant)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const store = new Store();

function createWindow() {
  const preloadPath = path.join(__dirname, "preload.cjs");

  const win = new BrowserWindow({
    width: 1350,
    height: 960,
    webPreferences: {
      preload: preloadPath,
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
    },
  });

  win.webContents.on("preload-error", (event, preloadPath, error) => {
    console.error("❌ Preload error:", error);
  });

  win.webContents.on("console-message", (event) => {});

  win.setMenu(null);

  if (process.env.NODE_ENV === "development" && process.env.DEV_SERVER_URL) {
    console.log(`Connecting to the development server: ${process.env.DEV_SERVER_URL}/#/auth`);
    win.loadURL(`${process.env.DEV_SERVER_URL}/#/auth`);
  } else {
    const possiblePaths = [
      path.join(__dirname, "web", "dist", "index.html"),
      path.join(__dirname, "..", "web", "dist", "index.html"),
      path.join(process.resourcesPath, "web", "dist", "index.html"),
    ];
    const foundPath = possiblePaths.find((p) => fs.existsSync(p));

    if (foundPath) {
      win.loadFile(foundPath, { hash: "/auth" });
    } else {
      win.loadURL("data:text/html,<h1>File or Server Not Found</h1>");
    }
  }

  // DevTools is only available in the Dev environment
  if (process.env.NODE_ENV === "development") {
    win.webContents.openDevTools();
  }

  win.webContents.on("did-fail-load", (event, errorCode, errorDescription, validatedURL) => {
    console.error("Failed to load:", errorCode, errorDescription, validatedURL);
  });

  win.webContents.on("dom-ready", () => {});
}

protocol.registerSchemesAsPrivileged([
  {
    scheme: "file",
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true,
    },
  },
]);

/* ===============================
   IPC HANDLERLAR
   =============================== */
ipcMain.handle("store:set", (event, key, value) => {
  store.set(key, value);
  return true;
});

ipcMain.handle("auth:getTokens", () => {
  return {
    accessToken: store.get("jwt_access"),
    refreshToken: store.get("jwt_refresh"),
  };
});

ipcMain.handle("store:get", (event, key) => {
  return store.get(key);
});

ipcMain.handle("store:delete", (event, key) => {
  store.delete(key);
  return true;
});

ipcMain.handle("get-locale", () => {
  const locale = app.getLocale();
  return locale;
});

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
