/**
 * 深拷贝
 * @param {*} src 
 * @param {*} target 
 */
const deepCopy = (src, target) => {
  if (!src || typeof src !== "object") {
    return src;
  }

  target = target || src.constructor === Array ? [] : {}

  for (var i in src) {
    if (src.hasOwnProperty(i)) {
      target[i] = typeof src[i] === "object" ? deepCopy(src[i]) : src[i]
    }
  }
  return target
}

/**
 * 随机min-max之间的一个整数
 * 包含min和max
 */
function random(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

/**
 * 是否是闰年
 * @param {*} date 
 */
const isLeapYear = (date) => {
  return new Date(date.getFullYear(), 2, 0).getDate() == 29
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

function mix(to, from) {
  for (var i in from) {
    to[i] = from[i]
  }
  return to
}