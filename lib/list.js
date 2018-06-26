#!/usr/bin/env node

const chalk = require('chalk')
const { config } = require('../.iphaser.config')

function list () {
  console.log()
  Object.values(config).forEach(t => {
    console.log(
      '  ' + chalk.yellow('★') +
      '  ' + chalk.blue(t.name) +
      ' - ' + chalk.cyan(t.desc)
    )
  })
  console.log()
}

module.exports = function () {
  list()
}
