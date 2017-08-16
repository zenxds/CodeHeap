import fetch from 'whatwg-fetch'

export default (input, options={}) => {
  options = Object.assign({
    credentials: "same-origin"
  }, options)

  if (/post/i.test(options.method)) {
    options.headers = Object.assign({
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    }, options.headers || {})
  }

  return fetch(input, options).then((response) => {
    return response.json()
  }).then((response) => {
    if (response.code === 200) {
      return response.data
    } else {
      throw new Error(response.msg || 'request error')
    }
  })
}