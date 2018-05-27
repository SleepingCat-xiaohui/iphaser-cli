const fs = require('fs')
const path = require('path')
const homedir = require('os').homedir()

const rc = fs.readFileSync(
  path.resolve(__dirname, '../.iphaserrc'),
  { encoding: 'utf-8' }
)

fs.writeFileSync(
  path.resolve(homedir, '.iphaserrc'),
  rc,
  { encoding: 'utf-8' }
)
