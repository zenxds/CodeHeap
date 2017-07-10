"星期" + "日一二三四五六".charAt(new Date().getDay())

function getRating(rating) {
  if (rating > 5 || rating < 0) throw new Error('数字不在范围内')
  return '★★★★★☆☆☆☆☆'.substring(5 - rating, 10 - rating)
}

/**
 * 数字补0
 */
('0' + n).substr(-2) // 2 位
('000' + n).substr(-4) // 4 位