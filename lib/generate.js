const shell = require('shelljs')
const ora = require('ora')
const chalk = require('chalk')
const fs = require('fs-extra')
const { config } = require('../.iphaser.config.js')

async function startProject (target) {
  const progress = ora(`installing packages...\n`)
  shell.cd(target)
  shell.exec('npm i', {
    silent: true,
  }, () => {
    progress.succeed(chalk.green('install succeed~'))
    shell.exec('npm run dev')
  })
  progress.start()
}

async function generateByTemplate (templatePath, target) {
  fs.copySync(templatePath, target, {
    overwrite: true,
    filter: (src) => !src.includes('.git'),
  })
}

async function downloadTemplate (template) {
  const progress = ora(`downloading template ${chalk.green(template)}...\n`)
  return new Promise((resolve, reject) => {
    shell.exec(`git clone ${config[template].templateRemote} ${config[template].templatePath}`, {
      silent: true,
    }, () => {
      progress.succeed(chalk.green('download succeed~'))
      resolve()
    })
    progress.start()
  })
}

async function main (template, target, cache) {
  const { templatePath } = config[template]

  if (!cache && fs.existsSync(templatePath)) await fs.remove(templatePath)

  if (!fs.existsSync(templatePath)) await downloadTemplate(template, template)

  await generateByTemplate(templatePath, target)

  startProject(target)
}

module.exports = function (template, target, cache) {
  main(template, target, cache)
}
