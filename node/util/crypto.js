const crypto = require('crypto')

const sha1 = (str) => {
  const hash = crypto.createHash('sha1')
  hash.update(str)
  return hash.digest('hex')
}

const md5 = (str) => {
  const hash = crypto.createHash('md5')
  hash.update(str)
  return hash.digest('hex')
}