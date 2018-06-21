const shell = require('shelljs')
const path = require('path')
const fs = require('fs')
const { config } = require('../.iphaser.config.js')

function startDocServer (version, port) {
  shell.exec(`${path.resolve(__dirname, '../node_modules/.bin/http-server')} ${config[`phaser${version}`].docRoot} -p ${port}`)
}

function updateDoc (version) {
  shell.exec(config[`phaser${version}`].docPull, {
    cwd: config[`phaser${version}`].docPath,
  })
}

module.exports = function (version, cmd) {
  console.log(version, cmd.port)
  // if (['2', '3'].indexOf(version) === -1) cmd.help()

  // if (!fs.existsSync(config[`phaser${version}`].docPath)) updateDoc(version)
  // else if (version === '3') updateDoc(version)

  // let port = +version + 3000
  // if (cmd.port) {
  //   port = cmd.rawArgs[cmd.rawArgs.findIndex(arg => arg === '-p' || arg === '--port') + 1]
  // }
  // startDocServer(version, port)
}
