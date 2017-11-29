/**
 * formate格式只有2014/07/12 12:34:35的格式可以跨平台
 * new Date()
 * new Date(时间戳)
 * new Date(year, month, day[, hour[, minute[, second[, millisecond]]]])
 */

// from moment
// risoDate = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,

const rnumberDate = /^\d{13}$/
const rstringDate = /^(\d{4}-\d{2}-\d{2})(T| )(\d\d:\d\d:\d\d)$/

// 解析一个日期, 返回日期对象
export default function(val) {
  if (val instanceof Date) {
    return val
  }

  if (rnumberDate.test(val)) {
    return new Date(+val)
  }

  const match = rstringDate.exec(val)
  if (match) {
    return new Date(match[1].replace(/-/g, '/') + ' ' + match[3])
  }

  return new Date()
}