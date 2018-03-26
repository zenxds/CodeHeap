import test from 'ava'
import stringify from './stringify'

test('json stringify', t => {
  const arr = [1, 2, 3, 4, 5]
  t.is(stringify(arr), '[' + arr.join(',') + ']')

  const obj = {
    key1: 'value1',
    key2: 123,
    key3: new Date(),
    key4: {
      key41: 'value41'
    }
  }
  t.truthy(stringify(obj))
})
