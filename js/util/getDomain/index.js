
/**
 * 在前端从域名中解析出1级、2级域名等
 * 由于域名解析规则太过复杂，这里只处理白名单里的域名后缀
 */
export default function getDomain(domain='', level=1) {
  let arr = domain.split('.')
  if (arr.length === 1) {
    return ''
  }

  let match = /\.(com\.cn|com|cn)$/.exec(domain)
  if (match) {
    let index = arr.length - match[1].split('.').length - level
    // index < 0 比如arr只是根域名，但是传入level是2的情况
    return index < 0 ? domain : arr.slice(index).join('.')
  }

  return ''
}