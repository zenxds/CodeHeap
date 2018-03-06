/**
 * Encode multi-byte Unicode string into utf-8 multiple single-byte characters
 * (BMP / basic multilingual plane only)
 *
 * Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3 chars
 *
 */
function utf8Encode(str) {
  if (!str) {
    return ''
  }

  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
  // 拆分后的单字节以1开头，utf8中没有在用
  return String(str).replace(
    /[\u0080-\u07ff]/g,
    function (c) {
      var cc = c.charCodeAt(0)
      return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f)
    }
  ).replace(
    /[\u0800-\uffff]/g,
    function (c) {
      var cc = c.charCodeAt(0)
      return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3f, 0x80 | cc & 0x3f)
    }
  )
}

// code顺序可以自定义
var base64Code = 'S0DOZN9bBJyPV-qczRa3oYvhGlUMrdjW7m2CkE5_FuKiTQXnwe6pg8fs4HAtIL1x='

// http://www.webtoolkit.info/javascript-base64.html
var base64Encode = function (input) {
  if (!input) {
    return ''
  }

  var output = ''
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4
  var i = 0

  // input = encodeURI(input);
  input = utf8Encode(input)

  while (i < input.length) {
    chr1 = input.charCodeAt(i++)
    chr2 = input.charCodeAt(i++)
    chr3 = input.charCodeAt(i++)

    // 第一个字符前6位
    enc1 = chr1 >> 2
    // 第一个字符后两位加第二个字符前4位
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
    // 第二个字符后四位加第三个字符前两位
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
    // 第三个字符后六位
    enc4 = chr3 & 63

    if (isNaN(chr2)) {
      enc3 = enc4 = 64
    } else if (isNaN(chr3)) {
      enc4 = 64
    }

    output = output + base64Code.charAt(enc1) + base64Code.charAt(enc2) +
    base64Code.charAt(enc3) + base64Code.charAt(enc4)
  }
  return output
}

module.exports = base64Encode
