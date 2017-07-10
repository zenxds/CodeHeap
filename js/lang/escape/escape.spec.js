import test from 'ava'
import {
  escapeHtml,
  unEscapeHtml
} from '.'

test('escape a html', t => {
  t.is(escapeHtml("<>"), '&lt;&gt;')
})
test('unescape a html', t => {
  t.is(unEscapeHtml("&lt;&gt;"), '<>')
})
 