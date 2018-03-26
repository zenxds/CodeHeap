import { param } from './param'
// 不严谨一点也可以使用isObject
import isPlainObject from './isPlainObject.js'
import Promise from './Promise'

/**
 * @param {*} options 
 * method
 * url
 * data
 * dataType
 * async
 * headers
 * credentials
 * timeout
 */

export default (options={}) => {
  options = extend({}, {
    method: 'GET',
    url: '',
    dataType: 'json',
    data: {},
    headers: {},
    timeout: 30 * 1000,
    async: true,
    cache: false,    
    credentials: false
  }, options)

  options.method = options.method.toUpperCase()
  options.dataType = options.dataType.toLowerCase()

  if (options.method === 'GET' && isPlainObject(options.data)) {
    if (!options.cache) {
      options.data._ = Math.random().toString().slice(2)
    }
    options.url += (options.url.indexOf('?') > 0 ? '&' : '?') + param(options.data)
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const onerror = error => {
      reject({
        xhr,
        options,
        error
      })
    }
    const onload = () => {
      // IE会将204设置为1223
      // Opear会将204设置为0，这里先不处理0
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || xhr.status === 1223) {
        let resp = xhr.response || xhr.responseText

        if (options.dataType === 'json') {
          try {
            resolve(JSON.parse(resp))
          } catch(err) {
            onerror(err)
          }
        } else {
          resolve(resp)
        }
      } else {
        onerror(new Error('Request Error'))
      }
    }
    const ontimeout = () => {
      onerror(new Error('Network Timeout'))
    }
    const setRequestHeader = (k, v) => {
      if ('setRequestHeader' in xhr) {
        xhr.setRequestHeader(k, v)
      }
    }

    if ('onload' in xhr && 'timeout' in xhr) {
      xhr.onload = onload
    } else {
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          onload()
        }
      }
    }

    // onerror
    if ('onerror' in xhr) {
      xhr.onerror = () => {
        onerror(new Error('Network Error'))
      }
    }

    // timeout
    // IE8设置timeout会抛出错误
    try {
      xhr.timeout = options.timeout
      xhr.ontimeout = ontimeout
    } catch(err) {
      setTimeout(ontimeout, options.timeout)
    }

    // open
    xhr.open(options.method, options.url, options.async)
    if ('withCredentials' in xhr) {
      xhr.withCredentials = options.credentials
    }

    for(let i in options.headers) {
      setRequestHeader(i, options.headers[i])
    }
    setRequestHeader('X-Requested-With', 'XMLHttpRequest')

    if (/^(HEAD|GET)$/.test(options.method)) {
      xhr.send(null)
    } else {
      let data = options.data
      if (isPlainObject(data)) {
        data = param(data)
        setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      }

      xhr.send(data)
    }
  })
}

function extend(target, ...sources) {
  for (let i = 0; i < sources.length; i++) {
    let source = sources[i]

    for (let prop in source) {
      target[prop] = source[prop]
    }
  }
  return target
}