const { app, BrowserWindow } = require('electron');

function createWindow () {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    title: "FootyScopeFG Antrenör Paneli",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Sistem ilk açıldığında index.html (Giriş) sayfasını yükler
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});