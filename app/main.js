const { app, BrowserWindow, dialog } = require('electron');
const path = require('path')
const fs = require('fs')

let mainWindow = null;
const getFileFromUser = () => {
    const filenames = dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            { name: 'Text Files', extensions: ['txt', 'text']},
            { name: 'Markdown Files', extensions: ['md', 'markdown']},
        ],
    })
    if(!filenames) return;
    const filename = filenames[0]
    const content = fs.readFileSync(filename).toString()
    console.log(content);
}
app.on('ready', () => {
    /** show window once after html is loaded, in case a blink of blank at startup **/
    mainWindow = new BrowserWindow({ show: false })
    mainWindow.loadFile(path.join(__dirname, 'index.html'))
    getFileFromUser();
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
})
