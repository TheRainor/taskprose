// preload.cjs
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronStore", {
  set: (key, value) => ipcRenderer.invoke("store:set", key, value),
  get: (key) => ipcRenderer.invoke("store:get", key),
  delete: (key) => ipcRenderer.invoke("store:delete", key),
});

contextBridge.exposeInMainWorld("authAPI", {
  getTokens: () => ipcRenderer.invoke("auth:getTokens"),
});

contextBridge.exposeInMainWorld("localeAPI", {
  getLocale: () => {
    return ipcRenderer.invoke("get-locale");
  },
});