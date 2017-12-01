(function (win) {

  function log(url, callback) {
    // 防止请求被垃圾回收
    const image = new Image()
    const id = "_img_" + Math.random()

    win[id] = image
    image.onload = image.onerror = function () {
      win[id] = null
      if (callback) {
        callback()
      }
    }
    image.src = url
  }

  // 监听错误上报
  win.onerror = function (msg, url, line, col, e) {
    const data = {
      page: location.href,
      ua: navigator.userAgent,
      line: line,
      time: +new Date()
    }

    // 不一定所有浏览器都支持col参数
    data.col = col || (win.event && win.event.errorCharacter) || 0

    // 外部脚本错误， 且脚本与页面非同源
    // msg == "Script error."

    if (url) {
      data.url = url
    }

    // 有堆栈信息使用堆栈信息
    if (e && e.stack) {
      data.msg = String(e.stack)
    } else {
      data.msg = msg
    }

    const s = []
    for (let k in data) {
      s.push(k + "=" + encodeURIComponent(data[k]))
    }
    s = s.join("&")
    
    // log('domain' + '?' + s)
  }

  // crossorigin="anonymous"

  addHandler(window, 'error', function(event) {
    // attachEvent情况下第一个参数是string
    if (typeof event !== 'object') {
      event = window.event
    }

    if (!event) {
      return
    }
  
    let message = event.message || event.errorMessage || ''
    let url = event.filename || event.errorUrl || ''
    let line = event.lineno || event.errorLine || ''
    let col = event.colno || event.errorCharacter || ''

    alert([url, line, col, message].join('\n'))
  })

  function addHandler(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false)
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler)
    } else {
      element["on" + type] = handler
    }
  }
})(window)