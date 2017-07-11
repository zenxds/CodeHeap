/**
 * cross domain post
 * post data to a iframe
 */
export default (config={}) => new Promise((resolve, reject) => {
  const url = config.url
  const data = config.data || {}
  // the flag to wrap the jsonp result with <script>
  data.scriptWrapping = 1

  const form = makeForm(url, data)
  submit(form, (data) => {
    if (data.success) {
      resolve(data.data)
    } else {
      reject(data.msg)
    }
  })
})

function makeForm(url, data) {
  const form = document.createElement('form')

  for(let key in data) {
    addInput(form, key, data[key])
  }

  form.method = 'POST'
  form.action = url
  form.style.display = 'none'
  document.body.appendChild(form)
  return form
}

function addInput(form, key, value) {
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = key
  input.value = value
  form.appendChild(input)
}

let counter = 0
function submit(form, callback) {
  counter++
  const id = `_iframe_${counter}_${String(Math.random()).substring(2)}`

  const iframe = document.createElement('iframe')
  iframe.id = id
  iframe.name = id
  iframe.style.display = 'none'
  form.target = id
  document.body.appendChild(iframe)

  /**
   * pass data to parent window by postMessage
   */
  const fn = `(function(v){ parent.postMessage({k: '${id}', v: v}, '*')})`
  const messageHandler = (e) => {
    const data = e.data
    if (data.k === id) {
      window[id] && window[id](data.v)
    }
  }

  window[id] = (data) => {
    callback(data)

    iframe.parentNode.removeChild(iframe)
    form.parentNode.removeChild(form)
    delete window[id]
    window.removeEventListener('message', messageHandler)
  }
  window.addEventListener('message', messageHandler, false)

  form.action += (form.action.indexOf('?') > -1 ? '&' : '?')
    + `callback=${encodeURIComponent(fn)}`
  form.submit()
}