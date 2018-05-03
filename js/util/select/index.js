/**
 * 选择某个元素的内容
 */
function select(element) {
  let selectedText
  let nodeName = element.nodeName.toUpperCase()

  if (nodeName === "SELECT") {
    element.focus()
    selectedText = element.value
  } else if (/^(INPUT|TEXTAREA)$/.test(nodeName)) {
    let isReadOnly = element.hasAttribute("readonly")

    if (!isReadOnly) {
      element.setAttribute("readonly", "")
    }

    element.select()
    element.setSelectionRange(0, element.value.length)

    if (!isReadOnly) {
      element.removeAttribute("readonly")
    }

    selectedText = element.value
  } else {
    if (element.hasAttribute("contenteditable")) {
      element.focus()
    }

    let selection = window.getSelection()
    let range = document.createRange()

    range.selectNodeContents(element)
    selection.removeAllRanges()
    selection.addRange(range)

    selectedText = selection.toString()
  }

  return selectedText
}
