/**
 * CORS POST
 * @param {*} url 
 * @param {*} data 
 */
const post = function (url, data) {
  const defer = Promise.defer()
  const supportCORS = typeof XMLHttpRequest !== "undefined" && 'withCredentials' in new XMLHttpRequest()
  const method = 'POST'

  if (!supportCORS) {
    defer.reject(new Error('client don\'t support CORS'))
    return defer.promise
  }

  let xhr
  const handler = () => {
    const text = xhr && xhr.responseText
    defer.resolve(JSON.parse(text || '{}'))
  }
  const onerror = (e) => {
    defer.reject(e)
  }

  try {
    xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.withCredentials = true
    if (xhr.setRequestHeader) {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    }
    xhr.onload = handler
    xhr.onerror = onerror

    xhr.send('data=' + encodeURIComponent(data))
  } catch (e) {}

  return defer.promise
}