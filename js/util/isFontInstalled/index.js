import byCanvas from './canvas'
import byDom from './dom'

const canvasElem = document.createElement('canvas')
const supportCanvas = !!(canvasElem.getContext && canvasElem.getContext('2d'))

export default font => {
  return supportCanvas ? byCanvas(font) : byDom(font)
}
