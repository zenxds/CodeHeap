
/**
 * http://emailregex.com/
 */
export function isEmail(val) {
  return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val)
}

// https://github.com/yiminghe/async-validator/blob/master/src/rule/type.js
const urlPattern = new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i')
export function isURL(val) {
  return urlPattern.test(val)
}

export function isChinese(val) {
  return /^[\u4e00-\u9fa5]+$/.test(val)
}

export function isInteger(val) {
  return /^-?[1-9]\d*$/.test(val)
}

// 只能输入数字
// (v + '').replace(/[^1-9]/g, '')

export function isHexColor(val) {
  return /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i.test(val)
}

export function isImage(val) {
  return /(.*)\.(jpg|jpeg|png|gif|svg|webp|ico|bmp|tif|raw|tga)$/.test(val)
}

export function isIP(val) {
  return /((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))/.test(val)
}

export function isComment(val) {
  return /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/m.test(val)
}