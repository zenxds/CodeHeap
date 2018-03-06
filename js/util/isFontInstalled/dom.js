/**
 * https://www.samclarke.com/javascript-is-font-available/
 */

const container = document.createElement('span')
container.innerHTML = Array(100).join('wi')
container.style.cssText = [
  'position: absolute',
  'width: auto',
  'font-size: 128px',
  'left: -99999px'
].join(' !important;')

const baseFonts = ['monospace', 'sans-serif', 'serif']
const baseSizes = {}

const getSize = font => {
  const ret = {}
  const body = document.body

  container.style.fontFamily = font
  body.appendChild(container)

  ret.w = container.clientWidth
  ret.h = container.clientHeight

  body.removeChild(container)
  return ret
}

// Pre compute the widths of monospace, serif & sans-serif
// to improve performance.
for (let i = 0; i < baseFonts.length; i++) {
  let font = baseFonts[i]
  baseSizes[font] = getSize(font)
}

export default font => {
  if (!document.body) {
    return false
  }

  for (let i = 0; i < baseFonts.length; i++) {
    let size = getSize(`${font},${baseFonts[i]}`)
    let baseSize = baseSizes[baseFonts[i]]

    if (size.w !== baseSize.w || size.h !== baseSize.h) {
      return true
    }
  }

  return false
}
