/**
 * 职责链模式
 */
Function.prototype.after = function(fn) {
  return (...args) => {
    let ret = this(...args)
    if (ret === 'next') {
      return fn(...args)
    }

    return ret
  }
}

const head = document.head || document.getElementsByTagName('head')[0]

function getCurrentScript1() {
  return document.currentScript || 'next'
}

function getCurrentScript2() {
  let scripts = head.getElementsByTagName("script")

  for (let i = scripts.length - 1; i >= 0; i--) {
    let script = scripts[i]
    if (script.readyState === "interactive") {
      return script
    }
  }

  return 'next'
}

function getCurrentScript3() {
  let scripts = head.getElementsByTagName("script")

  return scripts[scripts.length - 1]
}

let getCurrentScript = getCurrentScript1.after(getCurrentScript2).after(getCurrentScript3)
console.log(getCurrentScript())