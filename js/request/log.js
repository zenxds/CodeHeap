/**
 * 图片打点
 * @param {String} url 
 */
const log = url => {
  const img = new Image()
  const random = '_img_' + String(Math.random()).substring(2)
  window[random] = img

  img.onload = img.onerror = function () {
    window[random] = null
  }
  img.src = url
}

export default log

/**
 * http://tongji.baidu.com/open/api/more?p=guide_trackEvent
 * 
 * ['_trackEvent', category, action, opt_label, opt_value]
 */
export function trackEvent(...args) {
  const _hmt = window._hmt
  if (!_hmt) {
    return
  }

  args = ['_trackEvent', 'a.com', ...args]
  _hmt.push(args)
}

export function trackPageview(path) {
  const _hmt = window._hmt
  if (!_hmt) {
    return
  }

  _hmt.push(['_trackPageview', `/a.com${path}`])
}