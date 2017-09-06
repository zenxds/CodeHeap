export default function(array, fn) {
  const ret = []

  for (let i = 0; i < array.length; i++) {
    const item = array[i]
    if (fn(item, i, array)) {
      ret.push(item)
    }
  }

  return ret
}