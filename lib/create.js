const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const generate = require('./generate.js')
const { config } = require('../.iphaser.config.js')

module.exports = async function (template, project, cmd) {
  if (Object.keys(config).indexOf(template) === -1) cmd.help()

  const inCurrent = !project
  let target = path.resolve(project || '.')

  if (inCurrent) {
    const { ok } = await inquirer.prompt({
      name: 'ok',
      type: 'confirm',
      message: 'Generate project in current directory?',
      default: false,
    })
    if (!ok) return
  } else if (fs.existsSync(target)) {
    const { action } = await inquirer.prompt({
      name: 'action',
      type: 'list',
      message: `Target directory ${chalk.cyan(target)} already exists. Pick an action:`,
      choices: [
        { name: 'Overwrite', value: 'overwrite' },
        { name: 'Merge', value: 'merge' },
        { name: 'Cancel', value: false },
      ],
    })
    if (!action) return
    else if (action === 'overwrite') await fs.remove(target)
  }

  generate(template, target, cmd.offline)
}
