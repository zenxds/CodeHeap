// http://fex.baidu.com/blog/2015/05/nodejs-hot-swapping/
function cleanCache(modulePath) {
  const module = require.cache[modulePath]
  if (!module) {
    return
  }

  if (module.parent) {
    module.parent.children.splice(module.parent.children.indexOf(module), 1)
  }

  delete require.cache[modulePath]
}