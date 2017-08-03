import fetch from 'whatwg-fetch'

export default (input, options={}) => {
  options = Object.assign({
    credentials: "same-origin"
  }, options)

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