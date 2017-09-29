const fs = require('fs')
const fse = require('fs-extra')
const shell = require('shelljs')

const exec = (cmd) => {
  const result = shell.exec(cmd)
  return result.code === 0 ? Promise.resolve() : Promise.reject(result.stderr)
}

/**
 * 链接
 * https://serverfault.com/questions/147787/how-to-update-a-symbolic-link-target-ln-f-s-not-working
 */
module.exports = (target, linkName) => {
  // 如果linkName是一个实际的目录（非链接目录），先删除掉，使用lstatSync可以区分普通目录和链接目录
  if (fs.existsSync(linkName) && fs.lstatSync(linkName).isDirectory()) {
    fse.removeSync(linkName)
  }
  await exec(`ln -sfT ${target} ${linkName}`)
}


const asyncExec = (cmd, { timeout=10000 }) => {
  return new Promise((resolve, reject) => {
    let process
    let timer

    process = shell.exec(cmd, function(code, stdout, stderr) {
      if (code === 0) {
        resolve()
      } else {
        reject(stderr)
      }

      clearTimeout(timer)
    })

    timer = setTimeout(() => {
      process.kill()
      reject('timeout')
    }, timeout)
  })
}