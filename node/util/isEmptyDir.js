const fs = require('fs')

/**
 * 是否是空目录
 */
module.exports = (dest) => {
  return !fs.existsSync(dest) || (fs.statSync(dest).isDirectory() && !fs.readdirSync(dest).length)
}