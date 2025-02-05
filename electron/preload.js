const { contextBridge, ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }

  window.electron = true;
});
/*
contextBridge.exposeInMainWorld("electron", {
  saveJson: (data) => ipcRenderer.send("save-json", data),
  onSaveSuccess: (callback) =>
    ipcRenderer.on("save-success", (_, message) => callback(message)),
  onSaveError: (callback) =>
    ipcRenderer.on("save-error", (_, message) => callback(message)),
});
*/
