import test from 'ava'
import {
  isEmail,
  isChinese,
  isInteger
} from '.'

import Validator from './Validator'

test('isEmail', t => {
  t.truthy(isEmail('aaa@123.com'))
  t.falsy(isEmail('abcdefg'))
})

test('isChinese', t => {
  t.truthy(isChinese('一段中文'))
  t.falsy(isChinese('abcdefg中文'))
})

test('isInteger', t => {
  t.truthy(isInteger(123))
  t.truthy(isInteger(-123))
  t.falsy(isInteger(123.45))
})

test.cb('Validator', t => {
  const validator = new Validator({
    userName: {
      required: true,
      message: '用户名不能为空'
    }
  })

  validator.validate({
    userName: ''
  }).catch((errMsg) => {
    t.is(errMsg, '用户名不能为空')
    t.end()
  })
})

test.cb('Async Validator', t => {
  const validator = new Validator({
    test: {
      async: true,
      message: '异步错误'
    }
  })

  validator.addStrategy('async', (value, errorMsg) => new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(errorMsg)
    }, 1000)
  }))

  validator.validate({
    test: 'test'
  }).catch((errMsg) => {
    t.is(errMsg, '异步错误')
    t.end()
  })
})