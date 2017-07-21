import test from 'ava'
import {
  isEmail,
  isChinese,
  isInteger
} from '.'

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
