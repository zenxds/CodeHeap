/*
 * http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 * 洗牌算法
 * 多次运行测试是否足够随机
 * test code: https://gist.github.com/4507739
 */
const toString = Object.prototype.toString
const isArray = Array.isArray || function(val) {
  return toString.call(val) === '[object Array]'
}

import choice from '../choice'

const shuffle = (array) => {
  if (!isArray(array)) {
    return []
  }

  const length = array.length
  let i = length
  let j

  if (length === 0) {
    return []
  }

  while (--i) {
    j = choice(0, i + 1)
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default shuffle