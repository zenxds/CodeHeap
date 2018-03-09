/**
 * 简单对象stringify，一层不递归
 * @param {*} data
 */
export default function(data) {
  let ret = []

  for (let k in data) {
    let v = data[k]
    let v2 = typeof v === 'string' ? `"${v.replace(/"/g, '\\"')}"` : (v + '')

    ret.push(`"${k}": ${v2}`)
  }

  return '{' + ret.join(',') + '}'
}