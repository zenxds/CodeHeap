function isArraylike(obj) {
  const length = obj.length
  const type = jQuery.type(obj)

  if (type === "function" || jQuery.isWindow(obj)) {
    return false
  }

  if (obj.nodeType === 1 && length) {
    return true
  }

  return type === "array" || length === 0 ||
    typeof length === "number" && length > 0 && (length - 1) in obj
}

function sortBy(target, fn, scope) {
  const array = target.map(function(item, index) {
    return {
      el: item,
      re: fn.call(scope, item, index)
    }
  }).sort(function (left, right) {
    const a = left.re
    const b = right.re

    return a < b ? -1 : a > b ? 1 : 0
  })

  return array.map(function (item) {
    return item.el
  })
}

/**
 * sort dom array
 */
function sort(items, fn) {
  items = sortBy(items, fn)

  for (let i = 0; i < items.length; i++) {
    items[i].parentNode.appendChild(items[i])
  }
}