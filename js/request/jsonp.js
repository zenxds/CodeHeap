/**
 * jsonp 
 * 依赖param函数
 */
const head = document.head || document.getElementsByTagName('head')[0]

const jsonp = function(url, data) {
  const defer = Promise.defer()
  const script = document.createElement("script")
  const fn = '_' + String(Math.random()).substring(2)

  data.callback = fn

  // 构造URL
  url += url.indexOf('?') > 0 ? '&' : '?'
  url += param(data)

  window[fn] = function(d) {
    defer.resolve(d)

    try {
      head.removeChild(script)
      delete window[fn]
    } catch (e) {}
  }
  
  script.src = url  
  head.appendChild(script)

  return defer.promise
}