const names = [
  "Latin",
  "Chinese",
  "Arabic",
  "Devanagari",
  "Cyrillic",
  "Bengali/Assamese",
  "Kana",
  "Gurmukhi",
  "Javanese",
  "Hangul",
  "Telugu",
  "Tamil",
  "Malayalam",
  "Burmese",
  "Thai",
  "Sundanese",
  "Kannada",
  "Gujarati",
  "Lao",
  "Odia",
  "Ge-ez",
  "Sinhala",
  "Armenian",
  "Khmer",
  "Greek",
  "Lontara",
  "Hebrew",
  "Tibetan",
  "Georgian",
  "Modern Yi",
  "Mongolian",
  "Tifinagh",
  "Syriac",
  "Thaana",
  "Inuktitut",
  "Cherokee"
]

/**
 * codes比names多1
 * 最后一个codes是渲染为方块字的时候的unicode字符序号
 */
const codes = [
  [76, 97, 116, 105, 110],
  [27721, 23383],
  [1575, 1604, 1593, 1585, 1576, 1610, 1577],
  [2342, 2375, 2357, 2344, 2366, 2327, 2352, 2368],
  [1050, 1080, 1088, 1080, 1083, 1080, 1094, 1072],
  [
    2476,
    2494,
    2434,
    2482,
    2494,
    32,
    47,
    32,
    2437,
    2488,
    2478,
    2496,
    2479,
    2492,
    2494
  ],
  [20206, 21517],
  [2583, 2625, 2608, 2606, 2625, 2582, 2624],
  [43415, 43438],
  [54620, 44544],
  [3108, 3142, 3122, 3137, 3095, 3137],
  [2980, 2990, 3007, 2996, 3021],
  [3374, 3378, 3375, 3390, 3379, 3330],
  [4121, 4156, 4116, 4154, 4121, 4140],
  [3652, 3607, 3618],
  [7070, 7077, 7060, 7082, 7059],
  [3221, 3240, 3277, 3240, 3233],
  [2711, 2753, 2716, 2736, 2750, 2724, 2752],
  [3749, 3762, 3751],
  [2825, 2852, 2893, 2837, 2867],
  [4877, 4821, 4829],
  [3523, 3538, 3458, 3524, 3517],
  [1344, 1377, 1397, 1400, 1409],
  [6017, 6098, 6040, 6082, 6042],
  [917, 955, 955, 951, 957, 953, 954, 972],
  [6674, 6682, 6664, 6673],
  [1488, 1500, 1508, 1489, 1497, 1514],
  [3926, 3964, 3921, 3851],
  [4325, 4304, 4320, 4311, 4323, 4314, 4312],
  [41352, 41760],
  [6190, 6179, 6185, 6189, 6179, 6191],
  [11612, 11593, 11580, 11593, 11599, 11568, 11606],
  [1808, 1834, 1825, 1821, 1808],
  [1931, 1960, 1928, 1964, 1920, 1960],
  [5123, 5316, 5251, 5198, 5200, 5222],
  [5091, 5043, 5033],
  [55295, 7077]
]

const fontSize = 12
const fontFace = "Verdana"
const container = document.createElement('div')
container.style.cssText = [
  'position: absolute',
  'left: -99999px',
  'width: auto',
  'font-size: 128px',
  'font-style: normal',
  'font-weight: normal',
  'letter-spacing: normal',
  'line-break: auto',
  'line-height: normal',
  'text-transform: none',
  'text-align: left',
  'text-decoration: none',
  'text-shadow: none',
  'white-space: normal',
  'word-break: normal',
  'word-spacing: normal'
].join(' !important;')

const baseSize = getSize(codes.length - 1)

function getSize(index) {
  const ret = {
    width: [],
    height: []
  }
  const body = document.body
  const code = codes[index]

  body.appendChild(container)
  
  for (let i = 0; i < code.length; i++) {
    let c = code[i]

    container.innerHTML = '&#' + c
    container.style.font = `${fontSize} ${fontFace}`
    ret.width.push(container.clientWidth)
    ret.height.push(container.clientHeight)
  }

  body.removeChild(container)
  return ret
}

function isLanguageInstalled(index) {
  if (!document.body) {
    return false
  }

  let size = getSize(index)

  for (let i = 0; i < size.height.length; i++) {
    let h = size.height[i]
    
    if (h !== baseSize.height[0]) {
      return true
    }
  }

  for (let i = 0; i < size.width.length; i++) {
    let w = size.width[i]
    
    if (w !== baseSize.width[0] && w !== baseSize.width[1]) {
      return true
    }
  }

  return false
}

console.log(names.map((item, index) => {
  return isLanguageInstalled(index)
}).filter(item => !!item).length)