const shell = require('shelljs')
const path = require('path')
const fs = require('fs')
const net = require('net')
const { config } = require('../.iphaser.config.js')

function startDocServer (version) {
  const command = path.resolve(__dirname, '../node_modules/.bin/http-server')
  const rootDir = config[`phaser${version}`].docRoot
  findPort((port) => shell.exec(`${command} ${rootDir} -p ${port}`))
}

function updateDoc (version) {
  shell.exec(config[`phaser${version}`].docPull, {
    cwd: config[`phaser${version}`].docPath,
  })
}

function findPort (callback) {
  const server = net.createServer()
  server.listen(0, () => {
    const { port } = server.address()
    server.close(() => callback(port))
  })
}

module.exports = function (version, cmd) {
  if (['2', '3'].indexOf(version) === -1) cmd.help()

  if (!fs.existsSync(config[`phaser${version}`].docPath)) updateDoc(version)
  else if (version === '3') updateDoc(version)

  startDocServer(version)
}
