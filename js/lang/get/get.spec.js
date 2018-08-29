import test from 'ava'
import get from '.'

test('nest get', t => {
  const obj = {
    a: {
      b: {
        c: 'abc'
      }
    }
  }

  t.is(get(obj, 'a.b.c'), 'abc')
  t.is(get(obj, 'a.b.d'), undefined)
})