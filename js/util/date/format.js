/*
 * 将日期格式化成字符串
 *  Y - 4位年
 *  y - 2位年
 *  M - 不补0的月,
 *  m - 补0的月
 *  D - 不补0的日期
 *  d - 补0的日期
 *  H - 不补0的小时
 *  h - 补0的小时
 *  I - 不补0的分
 *  i - 补0的分
 *  S - 不补0的秒
 *  s - 补0的秒
 *  毫秒暂不支持
 *
 *  @return：指定格式的字符串
 */
export default function(date, format="Y-m-d h:i:s") {

  const o = {
    Y: date.getFullYear(),
    M: date.getMonth() + 1,
    D: date.getDate(),
    H: date.getHours(),
    I: date.getMinutes(),
    S: date.getSeconds()
  }

  const normalized = {}

  for (let k in o) {
    // 统一结果为字符串
    let v = o[k] + ''

    normalized[k] = v
    normalized[k.toLowerCase()] = padding2(v).slice(-2)
  }

  return format.replace(/y|m|d|h|i|s/gi, function(k) {
    return normalized[k]
  })

  function padding2(str) {
    return str.length === 1 ? '0' + str : str
  }
}