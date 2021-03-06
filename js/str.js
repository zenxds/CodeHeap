// 可以使用 \x 加 2位16进制字符标记一个单字节的字符
// 例如字符 'a' 可以表示为 \x61，用法类似\u 加4位16进制编码。
// \u 加四位十六进制数 或 \x 加2位十六进制数属于转义字符，在 js 字符串长度中只算 1 个

// \ 开始后接正数，可能被解析为8进制转义字符
// 一个八进制转义字符形成的条件是：斜线后面接的整数最长3位，至少1位，单个数字的字面值不大于8。
// 八进制转义字符的10进制数字字面值最大值为377(即10进制的255)，即 '\377' 被解析为一个字符，'\378' 被解析为2个字符： '\37' 和 '8'

// 字节长度
// 默认一个汉字占2字节
// 但可以定制
// 比如mysql存储时使用的是3个字节
function byteLength(str, fix=2) {
  return String(str).replace(/[^\x00-\xff]/g, new Array(fix + 1).join("-")).length
}

// from uglify
function to_ascii(str) {
  return str.replace(/[\u0080-\uffff]/g, function (ch) {
    let code = ch.charCodeAt(0).toString(16)

    if (code.length <= 2) {
      while (code.length < 2) {
        code = "0" + code
      }
      return "\\x" + code
    } else {
      while (code.length < 4) {
        code = "0" + code
      }
      return "\\u" + code
    }
  })
}

function doc(fn) {
  // 1. 移除起始的 function(){ /*!
  // 2. 移除末尾的 */ }
  // 3. 移除起始和末尾的空格
  return fn.toString()
    .replace(/^[^/]+\/\*!?/, '')
    .replace(/\*\/[^/]+$/, '')
    .trim()
}

function hexToRgba(color, opacity) {
  color = color.replace('#', '')

  if (color.length === 3) {
    color = color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2)
  }

  const r = parseInt(color.substr(0, 2), 16)
  const g = parseInt(color.substr(2, 2), 16)
  const b = parseInt(color.substr(4, 2), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

/**
 * 首字母大写
 * @param {*} str 
 */
const ucfirst = str => {
  return str.charAt(0).toUpperCase() + str.substring(1)
}

const startsWith = (str, prefix) => {
  return str.lastIndexOf(prefix, 0) === 0
}

const endsWith = (str, suffix) => {
  const index = str.length - suffix.length
  return index >= 0 && str.indexOf(suffix, index) === index
}