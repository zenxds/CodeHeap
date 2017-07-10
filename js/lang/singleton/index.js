/**
 * 单例模式
 * return only one instance
 * @param  {Function} fn      the function to return the instance
 * @return {Function}
 */
const singleton = (fn) => {
  let instance
  return (...args) => {
    return instance || (instance = fn(...args))
  }
}

export default singleton