import moment from 'moment'
import isHoliday from './isHoliday'


/**
 * 是否是一周最后一个工作日
 * 国外一周第一天是周日，所以要locale一下
 */
export default function isLastWorkingDay(m=moment()) {
  m.locale('zh-cn')

  let end = m.clone().endOf('week')
  let last = null
  
  for (let index = 0; index < 7; index++) {
    let d = index === 0 ? end : end.clone().subtract(index, 'day')

    if (!isHoliday(d)) {
      last = d
      break
    }
  }

  // 避免出现最后一天连着后面一周上班的情况
  if (last && last.format('YYYY-MM-DD') === m.format('YYYY-MM-DD') && isHoliday(last.add('1', 'day'))) {
    return true
  }

  return false
}