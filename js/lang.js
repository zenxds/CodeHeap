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

function mix(to, from) {
  for (var i in from) {
    to[i] = from[i]
  }
  return to
}