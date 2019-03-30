const { app, BrowserWindow, dialog } = require('electron');
const path = require('path')
const fs = require('fs')

let mainWindow = null;
const openFile = (filename) => {
    const content = fs.readFileSync(filename).toString()
    mainWindow.webContents.send('open-file', filename, content)
}
exports.getFileFromUser = () => {
    const filenames = dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            { name: 'Text Files', extensions: ['txt', 'text']},
            { name: 'Markdown Files', extensions: ['md', 'markdown']},
        ],
    })
    if(!filenames) return;
    const filename = filenames[0]
    // const content = fs.readFileSync(filename).toString()
    // return content
    openFile(filename)
}
app.on('ready', () => {
    /** show window once after html is loaded, in case a blink of blank at startup **/
    mainWindow = new BrowserWindow({ show: false })
    mainWindow.loadFile(path.join(__dirname, 'index.html'))
    // getFileFromUser();
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
})
