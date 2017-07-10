import test from 'ava'
import singleton from '.'

test('singleton the result', t => {
  const fn = singleton(() => {
    return {}
  })

  t.is(fn(), fn())  
})
