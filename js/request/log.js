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