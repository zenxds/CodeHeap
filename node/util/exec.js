const shell = require('shelljs')

exports.exec = (cmd, { timeout=10000 }) => {
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
