/*
 * 返回m-n之间的随机数，并取整,
 * 包括m, 不包括n - floor, ceil相反
 * 也可以传入数组，随机返回数组某个元素
 */
const toString = Object.prototype.toString
const isArray = Array.isArray || function(val) {
  return toString.call(val) === '[object Array]'
}

const choice = function (m, n) {
  let array
  let random

  if (isArray(m)) {
    array = m
    m = 0
    n = array.length
  }

  if (m > n) {
    [m, n] = [n, m]
  }

  random = Math.floor(Math.random() * (n - m) + m)
  return array ? array[random] : random
}

export default choice