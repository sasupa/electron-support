// Modules to control application life and create native browser window
const {app, BrowserWindow, BrowserView} = require('electron')
const path = require('path')

// Global variables
global["testVar"] = "a var set in main.js"
var userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36"

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    minHeight: 200,
    minWidth: 150,
    x: 100,
    y: 100,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // load window content
  mainWindow.loadFile('index.html')
  mainWindow.openDevTools({mode:'undocked'})

  // Add browserviews for Google Calendar & Whatspp during createWindow() function
  let calView = new BrowserView(webPreferences = {zoomFactor: 0.5})
  mainWindow.addBrowserView(calView)
  calView.setBounds({ width: 880, height: 400, x: 520, y: 0 })
  calView.setAutoResize({ width: true, height: false })
  calView.webContents.loadURL("https://calendar.google.com/calendar/r")

  let waView = new BrowserView()
  mainWindow.addBrowserView(waView)
  waView.setBounds({ width: 450, height: 800, x: 70, y: 0 })
  waView.setAutoResize({ width: false, height: false })
  waView.webContents.loadURL("https://web.whatsapp.com/", {userAgent: userAgent})

  let hookView = new BrowserView()
  mainWindow.addBrowserView(hookView)
  hookView.setBounds({ width: 880, height: 400, x: 520, y: 400 })
  hookView.setAutoResize({ width: false, height: false })
  //Tähän vois kokeilla jotain omaa
  //hookView.webContents.loadURL("http://localhost:5000/")


  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
