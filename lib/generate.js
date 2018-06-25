const shell = require('shelljs')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')
const fs = require('fs-extra')
const { config } = require('../.iphaser.config.js')

async function generateByTemplate (templatePath, target) {
  fs.readdirSync(templatePath)
    .filter((file) => file !== '.git')
    .forEach(async (file) => {
      const src = path.resolve(templatePath, file)
      const dest = path.resolve(target, file)
      await fs.move(src, dest)
    })
}

async function main (template, target, cache) {
  const { templatePath } = config[template]

  if (cache && fs.existsSync(templatePath)) return generateByTemplate(templatePath, target)
  else if (fs.existsSync(templatePath)) await fs.remove(templatePath)

  const progress = ora(`downloading template ${chalk.green(template)}...\n`)
  shell.exec(`git clone ${config[template].templateRemote} ${config[template].templatePath}`, {
    silent: true,
  }, () => {
    progress.stop()
    generateByTemplate(templatePath, target)
  })
  progress.start()
}

module.exports = function (template, target, cache) {
  main(template, target, cache)
}
