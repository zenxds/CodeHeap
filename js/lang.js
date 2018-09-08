/**
 * 深拷贝
 * @param {*} src 
 * @param {*} target 
 */
const deepCopy = (src, target) => {
  if (!src || typeof src !== "object") {
    return src
  }

  target = target || src.constructor === Array ? [] : {}

  for (let i in src) {
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
 * 从数组中随机选择一个元素
 */
function pick(arr) {
  return Array.isArray(arr) ? arr[Math.floor(Math.random() * arr.length)] : arr
}

/**
 * 是否是闰年
 * @param {*} date 
 */
const isLeapYear = (date) => {
  return new Date(date.getFullYear(), 2, 0).getDate() == 29
}

const isExtendsFrom = (Child, Parent) => {
  return isFunction(Child) && Child.prototype instanceof Parent
}

function mix(target, source) {
  for (let prop in source) {
    target[prop] = source[prop]
  }
  return target
}

/**
 * 不修改array引用的条件下 对数组过滤
 */
function filterArray(arr) {
  let index = 0
  
  while (index <= arr.length - 1) {
    const item = arr[index]

    if (item.value <= 0) {
      arr.splice(index, 1)
    } else {
      index += 1
    }
  }
}

const getArrayMax = arr => Math.max(...arr)

/**
 * 匹配带单双引号字符串里的内容
 */
const reg = /(['"])(.+?)\1/