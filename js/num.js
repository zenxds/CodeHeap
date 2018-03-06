// 保留两位小数
const getter = function (val) {
  return Math.round(val * 100) / 100
}

function isFloat(n){
  return Number(n) === n && n % 1 !== 0
}

const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n

/**
 * @see http://heeroluo.net/article/detail/115
 * 从个位数起，每三位之间加一个逗号。例如"10,000"
 * @param v {Number}
 * @returns {string}
 */
// const toDecimalMark = num => num.toLocaleString('en-US')

function toThousands(v) {
  let num = (v || 0).toString()
  let result = ''
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  return result
}

/**
 * int to kmb
 */

function abbrNum(number, decPlaces) {
  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = Math.pow(10, decPlaces || 1)

  // Enumerate number abbreviations
  const abbrev = ["k", "m", "b", "t"]

  // Go through the array backwards, so we do the largest first
  for (let i = abbrev.length - 1; i >= 0; i--) {

    // Convert array index to "1000", "1000000", etc
    const size = Math.pow(10, (i + 1) * 3)

    // If the number is bigger or equal do the abbreviation
    if (size <= number) {
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.
      number = Math.round(number * decPlaces / size) / decPlaces

      // Handle special case where we round up to the next abbreviation
      if ((number == 1000) && (i < abbrev.length - 1)) {
        number = 1
        i++
      }

      // Add the letter for the abbreviation
      number += abbrev[i]

      // We are done... stop
      break
    }
  }

  return number
}

// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
export function formatBytes(bytes, decimals=2) {
  if (bytes == 0) {
    return '0B'
  }

  const k = 1000
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + '' + sizes[i]
}