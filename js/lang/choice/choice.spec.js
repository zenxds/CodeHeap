import test from 'ava'
import choice from '.'

test('choice a item', t => {
  const arr = [1, 2, 3, 4, 5]
  t.truthy(arr.indexOf(choice(arr)) > -1)
})
