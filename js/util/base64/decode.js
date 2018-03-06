function utf8Decode(str) {
  if (!str) {
    return ''
  }

  // 跟上面转换过的范围一一对应
  // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
  return str.replace(
    /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, // 3-byte chars
    function (c) { // (note parentheses for precence)
      var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f)
      return String.fromCharCode(cc)
    }
  ).replace(
    /[\u00c0-\u00df][\u0080-\u00bf]/g, // 2-byte chars
    function (c) { // (note parentheses for precence)
      var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f
      return String.fromCharCode(cc)
    }
  )
}

// code顺序可以自定义
var base64Code = 'S0DOZN9bBJyPV-qczRa3oYvhGlUMrdjW7m2CkE5_FuKiTQXnwe6pg8fs4HAtIL1x='

var base64Decode = function (input) {
  if (!input) {
    return ''
  }

  var output = ''
  var chr1, chr2, chr3
  var enc1, enc2, enc3, enc4
  var i = 0

  // 保证格式正确
  // 注意自定义base64顺序的话这里的格式限定也要对应改变
  // input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '')

  while (i < input.length) {

    enc1 = base64Code.indexOf(input.charAt(i++))
    enc2 = base64Code.indexOf(input.charAt(i++))
    enc3 = base64Code.indexOf(input.charAt(i++))
    enc4 = base64Code.indexOf(input.charAt(i++))

    chr1 = (enc1 << 2) | (enc2 >> 4)
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
    chr3 = ((enc3 & 3) << 6) | enc4

    output = output + String.fromCharCode(chr1)
    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2)
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3)
    }
  }

  // output = decodeURI(output)
  output = utf8Decode(output)
  return output
}

module.exports = base64Decode
