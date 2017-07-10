import test from 'ava'
import underscored from '.'

test('underscored the str', t => {
  t.is(underscored('testStr'), 'test_str')
  t.is(underscored('test-str'), 'test_str')
})
