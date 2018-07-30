const fs = require('fs')
const path = require('path')

/**
 * 递归把目录下的JS文件转成对象的嵌套
 */
const walk = function(dir) {
  const ret = {}
  if (!fs.existsSync(dir)) {
    return ret
  }
  
  const ext = '.js'
  const files = fs.readdirSync(dir)

  for (let file of files) {
    let p = path.join(dir, file)
    let stat = fs.statSync(p)

    if (stat.isFile() && path.extname(p) === ext) {
      ret[path.basename(p, ext)] = require(p)
    } else if (stat.isDirectory()) {
      ret[path.basename(p)] = walk(p)
    }
  }

  return ret
}
