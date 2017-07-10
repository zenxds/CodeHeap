const each = (object, fn, context) => {
  let i = 0
  let length = object.length

  if (context) {
    fn = fn.bind(context)
  }
  if (length === +length) {
    for (; i < length; i++) {
      if (fn(object[i], i, object) === false) {
        break
      }
    }
  } else {
    for (i in object) {
      if (object.hasOwnProperty(i) && (fn(object[i], i, object) === false)) {
        break
      }
    }
  }
}

export default each