const shell = require('shelljs')
const chalk = require('chalk')
const { config } = require('../.iphaser.config')

if (!shell.which('git')) {
  shell.echo(chalk.red('Sorry, this script requires git'))
  shell.exit(1)
}

/**
 * init docs
 */
Object.values(config).forEach(doc => {
  shell.mkdir(doc.docPath)
  shell.cd(doc.docPath)
  shell.exec('git init')
  shell.exec(`git remote add origin ${doc.docRemote}`)
  shell.exec('git config core.sparseCheckout true')
  doc.docSparse.forEach(sparse => shell.exec(`echo ${sparse} >> .git/info/sparse-checkout`))
})
