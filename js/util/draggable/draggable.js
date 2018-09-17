(function ($) {

  const $document = $(document)

  const draggable = function(selector) {
    const $elements = $(selector)

    let $dragger
    // 鼠标的初始位置
    let mouseX
    let mouseY
    // 元素的x,y
    let draggerX
    let draggerY

    $elements.on('mousedown.draggable', function(event) {
      $dragger = $(this)

      mouseX = event.pageX
      mouseY = event.pageY

      const offset = $dragger.offset()
      draggerX = parseInt(offset.left, 10)
      draggerY = parseInt(offset.top, 10)

      $document.on('mousemove.draggable', dragElement)
    })

    function dragElement(event) {
      let left = draggerX + (event.pageX - mouseX)
      let top = draggerY + (event.pageY - mouseY)

      $dragger.css({
        'position': 'absolute',
        'left': left + 'px',
        'top': top + 'px'
      })
      return false
    }

    $document.on('mouseup.draggable', function () {
      $document.off('mousemove.draggable')
    })
  }

  $(function () {
    draggable("[data-draggable]")
  })

})(jQuery)