import test from 'ava'
import dasherize from '.'

test('dasherize the str', t => {
  t.is(dasherize('testStr'), 'test-str')
  t.is(dasherize('test_str'), 'test-str')
})
