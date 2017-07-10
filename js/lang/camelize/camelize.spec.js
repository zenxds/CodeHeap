import test from 'ava'
import camelize from '.'

test('camelize the str', t => {
  t.is(camelize('test-str'), 'testStr')
  t.is(camelize('test_str'), 'testStr')
})