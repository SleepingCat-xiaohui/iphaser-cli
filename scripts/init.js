const shell = require('shelljs')
const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const { config } = require('../.iphaser.config')

if (!shell.which('git')) {
  shell.echo(chalk.red('Sorry, this script requires git'))
  shell.exit(1)
}

/**
 * init docs
 */
Object.values(config).forEach(doc => {
  const gitConfig = path.resolve(doc.docPath, '.git')
  if (fs.existsSync(gitConfig)) fs.removeSync(gitConfig)

  fs.ensureDirSync(doc.docPath)
  shell.cd(doc.docPath)
  shell.exec('git init', { silent: true })
  shell.exec(`git remote add origin ${doc.docRemote}`, { silent: true })
  shell.exec('git config core.sparseCheckout true', { silent: true })
  doc.docSparse.forEach(sparse => shell.exec(`echo ${sparse} >> .git/info/sparse-checkout`), { silent: true })
})

/**
 * say hello
 */
const helloMessage = chalk.cyan(`  Hi guy~ Do you ❤ Phaser?
  If you do, you can join the Phaser QQ group(519413640), You'll find the big guy, the middle guy, the little guy and the gay guy~
  Looking forward to your participation.
`)
console.log(helloMessage)
