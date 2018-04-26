/**
 * 策略模式
 */

/**
 * 验证策略
 */
const strategies = {
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
 * const validator = new Validator()
 * 
 * validator.add('user1', [
 *  {
 *    required: true,
 *    msg: '用户名不能为空'
 *  }
 * ])
 */
class Validator {
  constructor() {
    this._rules = []
  }

  add(value, rules) {
    each(rules, rule => {
      each(strategies, (fn, strategy) => {
        if (rule.hasOwnProperty(strategy)) {
          let args = [value, rule.msg]
          let s = rule[strategy]
          if (typeof s === 'string') {
            args = args.concat(s.split(':'))
          } else {
            args.push(s)
          }

          this._rules.push(() => fn(...args))
        }
      })
    })
  }

  validate() {
    let ret = ''

    each(this._rules, fn => {
      let msg = fn()

      if (msg) {
        ret = msg
        return false
      }
    })

    return ret
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