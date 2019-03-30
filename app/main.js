const { app, BrowserWindow } = require('electron');
const path = require('path')

let mainWindow = null;
app.on('ready', () => {
    /** show window once after html is loaded, in case a blink of blank at startup **/
    mainWindow = new BrowserWindow({ show: false })
    mainWindow.loadFile(path.join(__dirname, 'index.html'))
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
})