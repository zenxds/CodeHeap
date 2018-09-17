function getScrollbarWidth() {
  const outer = document.createElement("div")
  outer.style.cssText += ";postion: absolute; left: -9999px; top: -9999px; visibility: hidden; width: 100px"

  // add innerdiv
  const inner = document.createElement("div")
  inner.style.cssText += ";width: 100%;"

  document.body.appendChild(outer)
  const widthNoScroll = outer.offsetWidth

  outer.style.overflow = "scroll"  
  outer.appendChild(inner)
  const widthWithScroll = inner.offsetWidth

  // remove divs
  outer.parentNode.removeChild(outer)
  return widthNoScroll - widthWithScroll
}

function getTextWidth(text) {
  const el = document.createElement('div')
  el.style.cssText += ';position: absolute; left: -9999px; top: -9999px'
  el.innerHTML = text

  document.body.appendChild(el)
  const width = el.offsetWidth
  document.body.removeChild(el)

  return width
}

function swapElements(node1, node2) {
  const parent = node2.parentNode
  const next = node2.nextSibling

  if (next === node1) {
    parent.insertBefore(node1, node2)
  } else {
    node1.parentNode.insertBefore(node2, node1)

    if (next) {
      parent.insertBefore(node1, next)
    } else {
      parent.appendChild(node1)
    }
  }
}