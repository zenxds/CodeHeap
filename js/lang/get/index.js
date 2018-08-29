/**
 * 类似于_.get
 * 支持map
 */
import isType from '../isType'

const isFunction = isType('Function')

export default (obj, p) => {
  const paths = (p + '').split('.')

  let current = obj

  for (let i = 0; i < paths.length; i++) {
    let v = isFunction(current.get) ? current.get(paths[i]) : current[paths[i]]
    if (v === undefined) {
      return v
    } else {
      current = v
    }
  }

  return current
}
