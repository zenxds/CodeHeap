/**
 * event.js
 * @author dongshuang.xds@alibaba-inc.com 2015.09
 *
 * 简单的事件模块
 * 自定义事件触发
 */

let slice = [].slice
let __events = {}

// Bind event
const on = function(name, callback) {
  let list = __events[name] || (__events[name] = [])
  list.push(callback)
}

const one = function(name, callback) {
  let _callback = function(...args) {
    off(name, _callback)
    callback(...args)
  }
  on(name, _callback)
}

// Remove event. If `callback` is undefined, remove all callbacks for the
// event. If `event` and `callback` are both undefined, remove all callbacks
// for all __events
const off = function(name, callback) {
  // Remove *all* __events
  if (!(name || callback)) {
    __events = {}
    return
  }

  let list = __events[name]
  if (!list) {
    return
  }

  if (callback) {
    for (let i = list.length - 1; i >= 0; i--) {
      if (list[i] === callback) {
        list.splice(i, 1)
      }
    }
  } else {
    delete __events[name]
  }
}

// Emit event, firing all bound callbacks. Callbacks receive the same
// arguments as `emit` does, apart from the event name
const trigger = function(name, ...args) {
  let list = __events[name]

  if (list) {
    // Copy callback lists to prevent modification
    list = list.slice()

    // Execute event callbacks, use index because it's the faster.
    for (let i = 0, len = list.length; i < len; i++) {
      list[i](...args)
    }
  }
}

module.exports = {
  on: on,
  one: one,
  off: off,
  trigger: trigger,

  __events: __events
}
