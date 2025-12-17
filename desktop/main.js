// main.js
import { app, BrowserWindow, ipcMain } from "electron/main";
import path from "node:path";
import fs from "fs";
import Store from "electron-store";
import { fileURLToPath } from "node:url";

// __dirname tanımı (ESM uyumlu)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const store = new Store();

function createWindow() {
  const preloadPath = path.join(__dirname, "preload.cjs");
  
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: preloadPath,
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
    },
  });

  // PRELOAD HATA YAKALAMA
  win.webContents.on('preload-error', (event, preloadPath, error) => {
    console.error("❌ Preload hatası:", error);
  });
  
  win.webContents.on('console-message', (event, level, message, line, sourceId) => {
  });

  // Menü çubuğunu kaldır
  win.setMenu(null);
  
  // Olası index.html yolları
  const possiblePaths = [
    path.join(__dirname, "web", "dist", "index.html"),
    path.join(__dirname, "..", "web", "dist", "index.html"),
    path.join(process.resourcesPath, "web", "dist", "index.html"),
    path.join(process.resourcesPath, "app", "web", "dist", "index.html"),
  ];

  // İlk bulunan geçerli path'i yükle
  const foundPath = possiblePaths.find((p) => fs.existsSync(p));

  if (foundPath) {
    win.loadFile(foundPath, { hash: "/auth" });
  } else {
    win.loadURL(
      "data:text/html,<h1>Dosya bulunamadı</h1><p>Path sorunları var</p>"
    );
  }

  // Sadece dev ortamında DevTools aç
  if (process.env.NODE_ENV === "development") {
    win.webContents.openDevTools();
  }

  win.webContents.on("did-fail-load", (event, errorCode, errorDescription, validatedURL) => {
    console.error("Failed to load:", errorCode, errorDescription, validatedURL);
  });

  win.webContents.on("dom-ready", () => {
  });
}

/* ===============================
   IPC HANDLERLAR (electron-store için)
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