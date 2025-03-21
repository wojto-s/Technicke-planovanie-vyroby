const path = require("path");
const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");

let serverProcess;
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
      sandbox: false,
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

  if (isDev) {
    //mainWindow.webContents.openDevTools();
  }
}

function getServerPath() {
  if (isDev) {
    return path.join(__dirname, "../server/server.js"); // Pre vývoj
  } else {
    return path.join(process.resourcesPath, "server", "server.js"); // Pre produkciu
  }
}

function runServer() {
  const serverPath = getServerPath();
  serverProcess = spawn("node", [serverPath], {
    detached: true,
    stdio: "ignore",
  });
  serverProcess.unref();
}

app.whenReady().then(() => {
  runServer();
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (serverProcess) {
    serverProcess.kill("SIGINT"); // Správne ukončenie procesu
  }
  if (process.platform !== "darwin") {
    app.quit();
  }
});
