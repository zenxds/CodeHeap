export default function(array, fn) {
  for (let i = 0; i < array.length; i++) {
    if(fn(array[i], i, array)) {
      return true
    }
  }

  return false
}