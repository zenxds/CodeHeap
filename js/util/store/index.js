import * as cookie from './cookie'
import * as ls from './ls'
import * as session from './session'

const modules = {
  '1': cookie,
  '2': ls,
  '3': session
}


export const get = (k) => {
  for (let i in modules) {
    let v = modules[i].get(k)

    if (v !== undefined) {
      return {
        type: i,
        value: v
      }
    }
  }
}

export const set = (k, v) => {
  for (let i in modules) {
    modules[i].set(k, v)
  }
}

export const remove = (k) => {
  for (let i in modules) {
    modules[i].remove(k)
  }
}
