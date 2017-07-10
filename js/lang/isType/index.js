// var isObject = isType("Object")
// var isArray = Array.isArray || isType("Array")

const toString = Object.prototype.toString
const isType = (type) => {
  return function(obj) {
    return toString.call(obj) == "[object " + type + "]"
  }
}

export default isType