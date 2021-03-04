# Quick Start Instructions

```txt
$ git clone https://github.com/magiclabs/example-electron.git
$ cd example-electron
$ mv .env.example .env // enter your Magic Publishable API key
$ yarn install
$ yarn electron
```

# Introduction

This tutorial shows how you can integrate Magic passwordless authentication into a desktop app using [Electron](https://www.electronjs.org/). Electron is a JavaScript framework based on Chromium and Node.js that allows you to use HTML, CSS, and JS to build cross-platform (Windows, Mac and Linux) native desktop applications. For this, we'll be using React.

View the example code [here](https://github.com/magiclabs/example-electron).

## File Structure

```txt
├── .env
├── README.md
├── electron
│   └── main.js
├── package.json
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── App.js
│   │   ├── Loading.js
│   │   ├── Login.js
│   │   └── Profile.js
│   ├── index.js
│   ├── magic.js
│   └── styles.css
└── yarn.lock
```

# Magic React Boilerplate

The Magic React app boilerplate will be taken from the `Hello World (React)` template using the `npx make-magic` command.

```txt
$ npx make-magic
npx: installed 1 in 1.472s


 █▀▀ █▀█ █▀▀ ▄▀█ ▀█▀ █▀▀
 █▄▄ █▀▄ ██▄ █▀█  █  ██▄

 █▀▄▀█ ▄▀█ █▀▀ █ █▀▀
 █ ▀ █ █▀█ █▄█ █ █▄▄

 ▄▀█ █▀█ █▀█
 █▀█ █▀▀ █▀▀


Running scaffold create-magic-app

✔ What is your project named? · example-electron
✔ Choose a template: · hello-world-react
✔ Enter your Magic publishable API key: · pk_test_3F8F2B46C789AB90
✔ Choose an NPM client: yarn
```

Since we won't be adding a redirect back to the app, go ahead and delete

1. the `redirectURI` parameter given to `loginWithMagicLink()`
2. the `/components/Callback.js` component
3. the `/callback` route in `App.js`

## Installing Dependencies

`electron-builder` is what compiles our app. `concurrently` and `wait-on` will be used together in the start script which will run our React app and build the Electron app at the same time.

```txt
yarn add electron electron-builder concurrently wait-on
```

## Main.js

`electron/main.js` contains the `main process` for the app. When it's ready, we create our Electron app using the `BrowserWindow` module, and load it with our React app which is running in the background on `localhost:3000`. All of this code is run in a `Node.js` environment.

```js
const { app, BrowserWindow } = require('electron');

// Build a new browser window for your app to open up
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadURL('http://localhost:3000');
}

// Once app is initialized, create the app
app.whenReady().then(createWindow);

// Quit the app when no windows are open
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Only create a new window if no windows are already open (prevents your app being open multiple times)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
```

## Package.json

Our `package.json` will need additional fields to know how to start the app.

1. Add `"main": "electron/main.js"` to specify where the main process is being run.

2. Below is the start script that needs to be added inside the `scripts` object. The React app needs to be running before the Electron app is able to load and this ensures that happens.

```js
"electron": "concurrently \"npm start\" \"wait-on http://localhost:3000 && electron .\""
```

# Done

Your Electron app is now secured with Magic, and you can run the app with `yarn electron`!
