/**
 * 策略模式
 */

/**
 * 验证策略
 */
const builtInStrategies = {
  required: function(value, errorMsg) {
    if (value === "") {
      return errorMsg
    }
  },

  minLength: function(value, errorMsg, length) {
    if (value.length < length) {
      return errorMsg
    }
  },

  pattern: function(value, errorMsg, reg) {
    if (!reg.test(value)) {
      return errorMsg
    }
  }
}

/**
 * const validator = new Validator({
 *   userName: [
 *     {
 *       required: true,
 *       message: '用户名不能为空'
 *     }
 *   ]
 * })
 * 
 * validator.validate({
 *   userName: 'user1'
 * })
 */
class Validator {
  constructor(descriptor={}) {
    this.initRules(descriptor)
    this.initStrategies()
  }

  initStrategies() {
    this._strategies = {}

    each(builtInStrategies, (strategy, name) => {
      this._strategies[name] = strategy
    })
  }

  addStrategy(name, strategy) {
    this._strategies[name] = strategy
  }

  initRules(descriptor) {
    this._rules = {}

    each(descriptor, (rules, name) => {
      this._rules[name] = isArray(rules) ? rules : [rules]
    })
  }

  validate(values={}) {
    let strategies = this._strategies
    let asyncRules = []
    let errorMsg = ''

    each(values, (value, name) => {
      const rules = this._rules[name]

      each(rules, rule => {
        each(strategies, (fn, strategy) => {
          if (!rule.hasOwnProperty(strategy)) {
            return
          }

          let args = rule[strategy]
          if (!isArray(args)) {
            args = [args]
          }
          args = [value, rule.message].concat(args)

          let ret = fn(...args)
  
          if (isThenable(ret)) {
            asyncRules.push(ret)
            return
          }

          if (ret) {
            errorMsg = ret
            return false
          }
        })

        return !errorMsg
      })

      return !errorMsg
    })

    if (errorMsg) {
      return Promise.reject(errorMsg)
    } else if (asyncRules.length) {
      return Promise.race(asyncRules)
    }

    return Promise.resolve()
  }
}

export default Validator

function each(object, fn) {
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

function isThenable(obj) {
  return obj && isFunction(obj.then)
}

const isFunction = isType('Function')
const isArray = Array.isArray || isType('Array')
function isType(type) {
  return function(obj) {
    return {}.toString.call(obj) == "[object " + type + "]"
  }
}