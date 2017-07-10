import each from '../each'

const htmlEntities = {
  '&amp;': '&',
  '&gt;': '>',
  '&lt;': '<',
  '&#x60;': '`',
  '&#x2F;': '/',
  '&quot;': '"',
  '&#x27;': "'"
}
const reverseEntities = {}

const getEscapeReg = () => {
  let str = ''
  each(htmlEntities, (entity) => {
    str += entity + '|'
  })
  str = str.slice(0, -1)
  return new RegExp(str, 'g')
}
const getUnEscapeReg = function () {
  let str = ''
  each(reverseEntities, (entity) => {
    str += entity + '|'
  })
  str += '&#(\\d{1,5});'

  return new RegExp(str, 'g')
}

each(htmlEntities, function (entity, k) {
  reverseEntities[entity] = k
})

export const escapeHtml = (str) => {
  return (str + '').replace(getEscapeReg(), function(all) {
    return reverseEntities[all]
  })
}
export const unEscapeHtml = (str) => {
  return (str + '').replace(getUnEscapeReg(), function(all) {
    return htmlEntities[all]
  })
}