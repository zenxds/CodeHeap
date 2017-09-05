/**
 * https://developer.mozilla.org/zh-CN/Add-ons/Code_snippets/Canvas
 */

const methods = [
  'arc',
  'arcTo',
  'beginPath',
  'closePath',  
  'bezierCurveTo',
  'quadraticCurveTo',
  'clearRect',
  'clip',
  'drawImage',
  'fill',
  'fillRect',
  'fillText',
  'stroke',
  'strokeRect',
  'strokeText',
  'lineTo',
  'moveTo',
  'rect',
  'save',
  'restore',
  'rotate',
  'scale',
  'translate',  
  'transform',
  'setTransform',
  'setLineDash',
  'drawFocusIfNeeded'
]

const getterMethods = [
  'getLineDash',

  'createPattern',
  // drawFocusRing not currently supported
  'drawFocusRing',
  'isPointInPath',
  'isPointInStroke',
  'measureText', 
  // The following might instead be wrapped to be able to chain their child objects
  'createImageData',
  'createLinearGradient',
  'createRadialGradient',
  'getImageData',
  'putImageData'
]

const props = [
  'canvas',
  'fillStyle',
  'font',
  'globalAlpha',
  'globalCompositeOperation',
  'lineCap',
  'lineJoin',
  'lineWidth',
  'lineDashOffset',
  'miterLimit',
  'shadowOffsetX',
  'shadowOffsetY',
  'shadowBlur',
  'shadowColor',
  'strokeStyle',
  'textAlign',
  'textBaseline'
]

class Context {
  constructor(canvas) {
    if (typeof canvas === 'string') {
      canvas = document.getElementById(canvas)
    }

    this.ctx = canvas.getContext('2d')
    this.setup()
  }

  setup() {
    methods.forEach(method => {
      this[method] = (...args) => {
        this.ctx[method](...args)
        return this
      }
    })

    getterMethods.forEach(method => {
      this[method] = (...args) => {
        return this.ctx[method](...args)
      }
    })

    props.forEach(prop => {
      this[prop] = value => {
        if (value === undefined) {
          return this.ctx[prop]
        }

        this.ctx[prop] = value
        return this
      }
    })
  }
}