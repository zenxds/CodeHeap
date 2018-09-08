"星期" + "日一二三四五六".charAt(new Date().getDay())

function getRating(rating) {
  if (rating > 5 || rating < 0) throw new Error('数字不在范围内')
  return '★★★★★☆☆☆☆☆'.substring(5 - rating, 10 - rating)
}

// 计算试用期结束时间
// moment('2018-09-01').add(6, 'month').subtract(1, 'day').format('YYYY-MM-DD')

/**
 * 数字补0
 */
('0' + n).substr(-2) // 2 位
('000' + n).substr(-4) // 4 位


// 检测devtool是否打开
;(function() {
  var checkStatus = 'off'
  var element = document.createElement('console')

  Object.defineProperty(element, 'id', {
    get: function() {
      checkStatus = 'on'
    }
  })
  
  console.log(element + '')
})()


/**
 * 计算两点之间的距离
 */
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0)