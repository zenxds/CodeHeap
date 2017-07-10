import test from 'ava'
import memoize from '.'

test('memoize the result', t => {
  const fn = memoize(() => {
    return {}
  })

  t.is(fn(1), fn(1))
  t.not(fn(1), fn(2))
  t.is(fn(2), fn(2))  
})
