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

## Magic React Boilerplate

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

_Note: Since we won't be adding a redirect back to the app, go ahead and delete `/components/Callback.js` and all references to that file._

## Installing Dependencies

`electron-builder` is what compiles our app. `concurrently` and `wait-on` will be used together in the `yarn electron` start script which will run our react app and build the electron app at the same time.

```txt
yarn add electron electron-builder concurrently wait-on
```

## Main.js

`electron/main.js` contains the `main process` for the app. When it's ready, we create our Electron app using `BrowserWindow`, and load it with our React app which is running in the background on `localhost:3000`. When the user closes out of the window, quit the app. All of this code is run in a `Node.js` environment.

```js
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
```

## Package.json

Our `package.json` will need additional fields to know how to start the app.

`"main": "electron/main.js"` specifies where the main process is being run.

Below is our start instructions. Our react app needs to be running before the electron app is able to load and this ensures that happens.

```js
"scripts": {
    "electron": "concurrently \"npm start\" \"wait-on http://localhost:3000 && electron .\""
}
```

## Conclusion

Although this was more of an Electron tutorial than a Magic one, you now have a running desktop app built with React and complete with authentication!
