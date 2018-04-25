const each = (object, fn) => {
  let length = object.length

  if (length === +length) {
    for (let i = 0; i < length; i++) {
      if (fn(object[i], i, object) === false) {
        break
      }
    }
  } else {
    for (let i in object) {
      if (object.hasOwnProperty(i) && (fn(object[i], i, object) === false)) {
        break
      }
    }
  }
}

export default each