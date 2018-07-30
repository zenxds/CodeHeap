// 隔离应用逻辑
// 应用逻辑应该和用户行为分开

// 比如
const handle = (x, y) => {

}

$('body').on('keyup', function (event) {
  // 不要直接进行应用逻辑处理，比如当某种情况下需要进行同样的处理时就需要复制代码了
  var keycode = (ev.keyCode ? ev.keyCode : ev.which)
  if (keycode == 13) {
    handleEnter()
  } else {
    handle(event.clientX, event.clientY) // 不要分发event对象，而是使用所需数据，这样也方便测试
  }
})

const getEvents = () => {
  const ret = []
  const pattern = /^on/
  for (let i in window) {
    if (pattern.test(i)) {
      ret.push(i)
    }
  }
  return ret.join('\n')
}