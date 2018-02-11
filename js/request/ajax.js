/**
 * 依赖Promise & param函数
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
    data: {},
    dataType: 'json',
    headers: {},
    async: true,
    credentials: false,
    timeout: 30 * 1000
  }, options)

  options.method = options.method.toUpperCase()
  if (options.method === 'GET') {
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
      let text = xhr.responseText

      if (options.dataType.toLowerCase() === 'json') {
        try {
          resolve(JSON.parse(text))
        } catch(err) {
          onerror(err)
        }
      } else {
        resolve(text)
      }
    }
    const ontimeout = () => {
      onerror(new TypeError('Network Timeout'))
    }
    const setRequestHeader = (k, v) => {
      if (xhr.setRequestHeader) {
        xhr.setRequestHeader(k, v)
      }
    }

    if ('onload' in xhr) {
      xhr.onload = onload
    } else {
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || xhr.status === 1223 || xhr.status === 0) {
            onload()
          } else {
            onerror(new TypeError('Request Error'))
          }
        }
      }
    }

    xhr.onerror = () => {
      onerror(new TypeError('Network Error'))
    }

    xhr.ontimeout = ontimeout
    setTimeout(ontimeout, options.timeout)

    xhr.open(options.method, options.url, options.async)
    xhr.withCredentials = options.credentials

    for(let i in options.headers) {
      setRequestHeader(i, options.headers[i])
    }
    setRequestHeader('X-Requested-With', 'XMLHttpRequest')

    if (options.method === 'GET') {
      xhr.send(null)
    } else {
      setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xhr.send(param(options.data))
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