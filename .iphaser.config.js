const path = require('path')

const config = {
  phaser2: {
    name: 'phaser2',
    desc: 'template based on phaser2.6.2 + webpack + es6.',
    templateRemote: 'https://github.com/SleepingCat-xiaohui/iphaser-template-phaser2.git',
    templatePath: path.resolve(__dirname, './storage/templates/v2'),
    docRemote: 'https://github.com/photonstorm/phaser.git',
    docPull: 'git pull origin render-pass',
    docPath: path.resolve(__dirname, './storage/docs/v2/'),
    docRoot: path.resolve(__dirname, './storage/docs/v2/v2/docs/'),
    docSparse: ['v2/docs'],
  },
  phaser3: {
    name: 'phaser3',
    desc: 'template based on phaser3 + webpack + es6',
    templateRemote: 'https://github.com/SleepingCat-xiaohui/iphaser-template-phaser3.git',
    templatePath: path.resolve(__dirname, './storage/templates/v3'),
    docRemote: 'https://github.com/photonstorm/phaser3-docs.git',
    docPull: 'git pull origin master',
    docPath: path.resolve(__dirname, './storage/docs/v3/'),
    docRoot: path.resolve(__dirname, './storage/docs/v3/docs/'),
    docSparse: ['docs', 'typescript'],
  },
}

module.exports = {
  config
}