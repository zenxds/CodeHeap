const memoize = function(fn, hasher) {
  const memo = {}

  // 默认拿第一个传入的参数做key
  hasher = hasher || function(val) {
    return val
  }

  return function(...args) {
    const key = hasher(...args)
    const val = memo[key]

      // 必须有返回结果才缓存
    return memo.hasOwnProperty(key) && val != null ? memo[key] : (memo[key] = fn(...args))
  }
}

export default memoize