// element.insertAdjacentHTML(position, text);
// beforeBegin：在该元素前插入
// afterBegin：在该元素第一个子元素前插入
// beforeEnd：在该元素最后一个子元素后面插入
// afterEnd：在该元素后插入

// createElement
// appendChild
// removeChild

// document.getElementsByTagName returns nodeList
// in html document nodeList is htmlCollection

// document.head是html5新定义的
const head = document.head || document.getElementsByTagName('head')[0] || document.documentElement
const body = document.body

const pageHeight = document.body.scrollHeight
const scrollX = window.pageXOffset || (document.documentElement && document.documentElement.scrollLeft) || document.body.scrollLeft

// nodeList to array
const toArray = (nodes) => {
  const ret = []
  const slice = [].slice
  try {
    ret = slice.call(nodes, 0)
  } catch (e) {
    for (var i = 0; i < nodes.length; i++) {
      ret.push(nodes[i])
    }
  }
}

export function isInsideElement(event, className) {
  let element = event.srcElement || event.target

  if (element.classList.contains(className)) {
    return true
  } else {
    do {
      element = element.parentNode

      if (element && element.classList && element.classList.contains(className)) {
        return true
      }
    } while (element)
  }

  return false
}

export function getParentUntil(element, className) {
  if (element.classList.contains(className)) {
    return element
  } else {
    do {
      element = element.parentNode

      if (element && element.classList && element.classList.contains(className)) {
        return element
      }
    } while (element)
  }

  return null
}