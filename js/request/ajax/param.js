const toString = Object.prototype.toString
const isArray = Array.isArray || function(val) {
  return toString.call(val) === '[object Array]'
}

const isValidParamValue = (val) => {
  const t = typeof val
  // If the type of val is null, undefined, number, string, boolean, return TRUE.
  return val === null || (t !== 'object' && t !== 'function')
}

const encode = encodeURIComponent

export const param = (o, sep, eq, serializeArray) => {
  sep = sep || '&'
  eq = eq || '='
  if (serializeArray === undefined) {
    serializeArray = true
  }

  const buf = []

  for (let key in o) {  
    const val = o[key]
    key = encode(key)

    // val is valid non-array value
    if (isValidParamValue(val)) {
      buf.push(key)
      if (val !== undefined) {
        buf.push(eq, encode(val + ''))
      }
      buf.push(sep)
    }

    // val is not empty array
    else if (isArray(val) && val.length) {
      for (let i = 0; i < val.length; ++i) {
        const v = val[i]
        if (isValidParamValue(v)) {
          // ?aParam[]=value1&aParam[]=value2&aParam[]=value3
          buf.push(key, (serializeArray ? encode('[]') : ''))
          if (v !== undefined) {
            buf.push(eq, encode(v + ''))
          }
          buf.push(sep)
        }
      }
    }
    // ignore other cases, including empty array, Function, RegExp, Date etc.
  }

  buf.pop()
  return buf.join('')
}