export default function(target, ...sources) {
  for (let i = 0; i < sources.length; i++) {
    let source = sources[i]

    for (let prop in source) {
      target[prop] = source[prop]
    }
  }
  return target
}