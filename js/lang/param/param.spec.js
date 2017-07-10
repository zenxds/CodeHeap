import test from 'ava'
import { param, unparam } from './param'

test(t => {
  t.is(param({
    a: 'a',
    b: 'b',
    c: '123'
  }), 'a=a&b=b&c=123')
  
  t.deepEqual({
    a: 'a',
    b: 'b',
    c: '123'
  }, unparam('a=a&b=b&c=123'))
})

