const path = require("path");
const fs = require("fs");
const { app, BrowserWindow } = require("electron");

const isDev = process.env.IS_DEV == "true" ? true : false;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    autoHideMenuBar: false,
    resizable: true,
    fullscreen: false,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: "deny" };
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../dist/index.html")}`
  );

  // Open the DevTools.
  if (isDev) {
    //mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
/*
ipcMain.on("save-json", (event, data) => {
  const filePath = path.join(app.getPath("userData"), "vyroba.json"); // Zapisujeme do priečinka Electron aplikácie
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      event.reply("save-error", "Chyba pri zápise JSON súboru");
    } else {
      event.reply("save-success", "Údaje boli úspešne zapísané!");
    }
  });
});
*/
