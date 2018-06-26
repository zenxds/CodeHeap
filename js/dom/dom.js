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

/**
 * 事件是否发生在元素内
 * @param {domEvent} event 
 * @param {node className} className 
 */
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

function getTextWidth(text) {
  const el = document.createElement('div')
  el.style.cssText += ';position: absolute; left: -9999px; top: -9999px'
  el.innerHTML = text

  document.body.appendChild(el)
  const width = el.offsetWidth
  document.body.removeChild(el)

  return width
}

{
  // 场景：滚动条滚动到页面内容块时对应的导航高亮
  const $elems = $('.elem')
  const $navs = $('.nav')
  const viewportHeight = $window.height()

  for (let i = 0; i < $elems.length; i++) {
    let rect = $elems[i].get(0).getBoundingClientRect()
    let center = Math.ceil(viewportHeight / 2)

    // 视口的中间线在元素的范围内
    if (center > rect.top && center < rect.bottom) {
      $navs.removeClass('active').eq(i).addClass('active')
      break
    }
  }
}

{
  // https://codepen.io/eksch/pen/xwdOeK
  $(window).scroll(function () {
    const scrollDistance = $(window).scrollTop()

    // Show/hide menu on scroll
    //if (scrollDistance >= 850) {
    //		$('nav').fadeIn("fast");
    //} else {
    //		$('nav').fadeOut("fast");
    //}

    // Assign active class to nav links while scolling
    $('.page-section').each(function (i) {
      if ($(this).position().top <= scrollDistance) {
        $('.navigation a.active').removeClass('active')
        $('.navigation a').eq(i).addClass('active')
      }
    })
  }).scroll()
}