const crypto = require('crypto')
const algorithm = 'aes-256-gcm'
const password = 'zygpxh8p0deo93ubh69ub0x0nzm5fby4'
const iv = 'v14rjhlxi8ei'

const fs = require('fs')

const cipher = crypto.createCipheriv(algorithm, password, iv)
const decipher = crypto.createDecipheriv(algorithm, password, iv)

const Transform = require('stream').Transform
class EncryptStream extends Transform {
  constructor(options) {
    super(options)
    
    this.cipher = options.cipher
  }

  _transform(chunk, encoding, callback) {
    this.push(this.cipher.update(chunk))
    callback()
  }

  _flush(callback) {
    this.push(this.cipher.final())
    this.push(this.cipher.getAuthTag())

    callback()
  }
}

class DecryptStream extends Transform {
  constructor(options) {
    super(options)
    
    this.decipher = options.decipher
    this.chunks = []
  }

  _transform(chunk, encoding, callback) {
    this.chunks.push(chunk)
    callback()
  }

  _flush(callback) {
    // 从末尾16位取出authTag
    const data = Buffer.concat(this.chunks)
    const authTag = data.slice(-16)
    
    this.decipher.setAuthTag(authTag)
    this.push(this.decipher.update(data.slice(0, -16)))
    this.push(this.decipher.final())
    callback()
  }
}



// start pipe
fs.createReadStream('file.txt').pipe(new EncryptStream({
  cipher: cipher
})).pipe(new DecryptStream({
  decipher: decipher
})).pipe(fs.createWriteStream('file.out.txt'))