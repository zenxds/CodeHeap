import test from 'ava'
import expect from 'expect.js'

import getDomain from '.'

test('getDomain', t => {
  expect(getDomain('www.taobao.com')).to.be('taobao.com')
  expect(getDomain('taobao.com')).to.be('taobao.com')
  expect(getDomain('taobao.com', 2)).to.be('taobao.com')

  expect(getDomain('www.taobao.com.cn')).to.be('taobao.com.cn')
  expect(getDomain('taobao.com.cn')).to.be('taobao.com.cn')
  expect(getDomain('taobao.com.cn', 2)).to.be('taobao.com.cn')

  expect(getDomain('lpl.lol.qq.com')).to.be('qq.com')
  expect(getDomain('lpl.lol.qq.com', 2)).to.be('lol.qq.com')
  expect(getDomain('lpl.lol.qq.com', 3)).to.be('lpl.lol.qq.com')
  expect(getDomain('lpl.lol.qq.com', 4)).to.be('lpl.lol.qq.com')

  expect(getDomain('aaa')).to.be('')
  t.pass()
})






