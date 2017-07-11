const supportCORS = typeof XMLHttpRequest !== "undefined" && 'withCredentials' in new XMLHttpRequest()

/**
 * CORS POST
 * 依赖param函数
 * @param {*} url 
 * @param {*} data 
 */
const post = (url, data) => new Promise((resolve, reject) => {
  if (!supportCORS) {
    reject(new Error('client don\'t support CORS'))
    return
  }

  const xhr = new XMLHttpRequest()
  const onload = () => {
    const text = xhr.responseText || '{ "success": false, "msg": "Empty responseText"}'
    resolve(JSON.parse(text))
  }
  const onerror = (e) => {
    reject(e)
  }

  xhr.open('POST', url, true)
  xhr.withCredentials = true
  if (xhr.setRequestHeader) {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
  }
  xhr.onload = onload
  xhr.onerror = onerror
  xhr.send(param(data))
})