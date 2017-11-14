/**
 * 将page坐标转为canvas坐标
 */
function windowPosToCanvas(canvas, x, y) {
  const rect = canvas.getBoundingClientRect()

  return {
    x: x - rect.left,
    y: y - rect.top
  }
}

/**
 * 圆角矩形
 */
function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath()
  ctx.moveTo(x, y + radius)
  ctx.lineTo(x, y + height - radius)
  ctx.quadraticCurveTo(x, y + height, x + radius, y + height)
  ctx.lineTo(x + width - radius, y + height)
  ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
  ctx.lineTo(x + width, y + radius)
  ctx.quadraticCurveTo(x + width, y, x + width - radius, y)
  ctx.lineTo(x + radius, y)
  ctx.quadraticCurveTo(x, y, x, y + radius)
  ctx.stroke()
}

/**
 * 获取某一个像素的颜色
 */
function getPixelColor(ctx, x, y) {
  const pixel = ctx.getImageData(x, y, 1, 1)

  return {
    r: pixel.data[0],
    g: pixel.data[1],
    b: pixel.data[2],
    a: pixel.data[3]
  }
}

function loadImageToBase64(url) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const image = new Image()
  image.src = url

  return new Promise((resolve, reject) => {
    image.onload = function () {
      resolve(this)
    }
    image.onerror = reject
  }).then(img => {
    canvas.width = img.width
    canvas.height = img.height
    ctx.clearRect(0, 0, img.width, img.height)
    ctx.drawImage(img, 0, 0)
    return canvas.toDataURL()
  })
}

/**
 * 把base64转成二级制数据，这个数据体积相比base64小很多，还可以塞到formdata中提交
 */
function convertCanvasToBlob(canvas) {
  const format = "image/jpeg"
  const base64 = canvas.toDataURL(format)
  const code = window.atob(base64.split(",")[1])
  const aBuffer = new window.ArrayBuffer(code.length)
  const uBuffer = new window.Uint8Array(aBuffer)

  for (let i = 0; i < code.length; i++) {
    uBuffer[i] = code.charCodeAt(i)
  }

  const Builder = window.WebKitBlobBuilder || window.MozBlobBuilder
  if (Builder) {
    const builder = new Builder()
    builder.append(buffer)

    return builder.getBlob(format)
  } else {
    return new window.Blob([buffer], {
      type: format
    })
  }
}