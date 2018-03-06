/**
 * http://www.zhangxinxu.com/wordpress/2018/02/js-detect-suppot-font-family/
 * 效率比较低
*/

// 使用该字体绘制的canvas
const width = 20
const height = 20
const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')

canvas.width = width
canvas.height = height
// 全局一致的绘制设定
context.textAlign = 'center'
context.fillStyle = 'black'
context.textBaseline = 'middle'

const baseFonts = ['monospace', 'sans-serif', 'serif']
const baseData = {}

const getFontData = font => {
  // 清除
  context.clearRect(0, 0, width, height)
  // 设置字体
  context.font = `2px ${font}`
  context.fillText('a', width / 2, height / 2)

  const data = context.getImageData(0, 0, width, height).data

  return [].slice.call(data).filter(function(value) {
    return value !== 0
  }).join('')
}

// Pre compute the widths of monospace, serif & sans-serif
// to improve performance.
for (let i = 0; i < baseFonts.length; i++) {
  let font = baseFonts[i]
  baseData[font] = getFontData(font)
}

export default font => {
  for (let i = 0; i < baseFonts.length; i++) {
    let data = getFontData(`${font},${baseFonts[i]}`)
    let base = baseData[baseFonts[i]]

    if (data !== base) {
      return true
    }
  }

  return false
}