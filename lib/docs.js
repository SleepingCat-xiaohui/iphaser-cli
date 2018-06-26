const shell = require('shelljs')
const path = require('path')
const fs = require('fs')
const net = require('net')
const ora = require('ora')
const chalk = require('chalk')
const { config } = require('../.iphaser.config.js')

function findPort (callback) {
  const server = net.createServer()
  server.listen(0, () => {
    const { port } = server.address()
    server.close(() => callback(port))
  })
}

function startDocServer (version) {
  const command = path.resolve(__dirname, '../node_modules/.bin/http-server')
  const rootDir = config[`phaser${version}`].docRoot
  findPort((port) => shell.exec(`${command} ${rootDir} -p ${port}`))
}

async function updateDoc (version) {
  const progress = ora(`updating ${version} docs...\n`)
  return new Promise((resolve, reject) => {
    shell.exec(config[`phaser${version}`].docPull, {
      cwd: config[`phaser${version}`].docPath,
      silent: true,
    }, () => {
      progress.succeed(chalk.green('update succeed~'))
      resolve()
    })
    progress.start()
  })
}

async function main (version, cmd) {
  if (['2', '3'].indexOf(version) === -1) cmd.help()

  const { docPath } = config[`phaser${version}`]
  if (fs.readdirSync(docPath).length === 1) await updateDoc(version)
  else if (version === '3') await updateDoc(version)

  startDocServer(version)
}

module.exports = function (version, cmd) {
  main(version, cmd)
}
