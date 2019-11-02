// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const remote = require("electron").remote
const { app, dialog, BrowserView } = remote

const quitButton = document.getElementById("quit-button")
const calButton = document.getElementById("cal-button")

quitButton.addEventListener("click", e => {
    app.quit()
    //console.log(remote.getGlobal("testVar")) < TOLLA GLOBAL VARIT MAIN.JS:stä
    //dialog.showMessageBox({message: "U quittin'?"}) < Kysely macin dialogin kautta
})

// funktio joka laukaisee kalenterin
function createCalWindow () {
    let win = remote.getCurrentWindow()
    let calView = new BrowserView()
    win.setBrowserView(calView)
    calView.setBounds({
        width: 700,
        height: 400,
        x: 100, 
        y: 0,
        })
    calView.setAutoResize({width: true, height: false})
    calView.webContents.loadURL('https://calendar.google.com/calendar/r')
}

// var joka muuttuu kun kalenteri on päällä, tahi ei
var calStatus = false
calButton.addEventListener("click", e => {
    if (!calStatus) {
        createCalWindow()
        calStatus = true
        console.log("Lisaa kalenteri")
    } else {
        let win = remote.getCurrentWindow()
        win.removeBrowserView(calView)
        console.log("Poista kalenteri")
    }
})

// Whatsappille {userAgent: remote.getGlobal("userAgent")}

// NÄIN SAA IKKUNOIDEN KOOT SELVILLE
// var win = window,
// doc = document,
// docElem = doc.documentElement,
// body = doc.getElementsByTagName('body')[0],
// x = win.innerWidth || docElem.clientWidth || body.clientWidth,
// y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;
// alert(x + ' × ' + y);
