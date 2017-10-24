const fs = require('fs')

const HOME = process.env.HOME
const DIST_DIR = `${HOME}/Library/Application Support/Google/Chrome/NativeMessagingHosts`

// copy easydt dir to DIST_DIR
const SCRIPT_DIR_NAME = 'easydt'
const SCRIPT_DIR_DEST = `${DIST_DIR}/${SCRIPT_DIR_NAME}`
try {
  fs.accessSync(SCRIPT_DIR_DEST)
} catch(e) {
  fs.mkdirSync(SCRIPT_DIR_DEST)
}

const fileNames = fs.readdirSync(`${__dirname}/${SCRIPT_DIR_NAME}`)
fileNames.forEach(fileName => {
  const sourcePath = `${__dirname}/${SCRIPT_DIR_NAME}/${fileName}`
  const destPath = `${DIST_DIR}/${SCRIPT_DIR_NAME}/${fileName}`
  fs.copyFileSync(sourcePath, destPath)
  fs.chmodSync(destPath, '777')
})

// write com.ele.easydt.json to DIST_DIR
const PACKAGE_NAME = 'com.ele.easydt.json'
const template = fs.readFileSync(`${__dirname}/${PACKAGE_NAME}.template`, 'utf8')
const result = template.replace(/__home__/, HOME)
fs.writeFileSync(`${DIST_DIR}/${PACKAGE_NAME}`, result)
