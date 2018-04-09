function getScrollbarWidth() {
  const outer = document.createElement("div")
  outer.style.cssText += ";postion: absolute; left: -9999px; top: -9999px; visibility: hidden; width: 100px"

  document.body.appendChild(outer)
  const widthNoScroll = outer.offsetWidth

  outer.style.overflow = "scroll"
  // add innerdiv
  const inner = document.createElement("div")
  inner.style.cssText += ";width: 100%;"
  outer.appendChild(inner)

  const widthWithScroll = inner.offsetWidth
  // remove divs
  outer.parentNode.removeChild(outer)

  return widthNoScroll - widthWithScroll
}