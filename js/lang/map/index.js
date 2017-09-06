export default function(array, fn) {
  const ret = []

  for (let i = 0; i < array.length; i++) {
    ret.push(fn(array[i], i, array))
  }

  return ret
}