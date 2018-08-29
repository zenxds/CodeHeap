/**
 * 对node节点列表排序
 */

const attrName = "data-status"

// 排序算法
const compare = function (node1, node2) {
  let type1 = parseInt(node1.getAttribute(attrName), 10)
  let type2 = parseInt(node2.getAttribute(attrName), 10)

  let ret
  if (type1 == type2) {
    ret = 0
  } else {
    ret = type1 > type2 ? 1 : -1
  }

  return ret
}

const sort = function () {
  const $items = $("tr[" + attrName + "]")
  const items = $items.get()

  items.sort(compare)

  for (let i = 0; i < items.length; i++) {
    items[i].parentNode.appendChild(items[i])
  }
}