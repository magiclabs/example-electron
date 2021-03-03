const { app, BrowserWindow } = require('electron');

function createWindow() {
  let win = new BrowserWindow({});

  win.loadURL('http://localhost:3000');

  win.on('closed', () => {
    win = null;
    app.quit();
  });
}

// Listening for the app to be ready before we create the window
app.whenReady().then(createWindow);
