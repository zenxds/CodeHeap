var promise
// 防止多次提交
$('body').on('click', function () {
  if (promise && promise.state() == "pending") {
    return
  }
  promise = $.ajax(url)
})