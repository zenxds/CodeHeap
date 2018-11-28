/**
 * https://github.com/ReactTraining/history/blob/master/modules/createHashHistory.js
 */
function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  const href = window.location.href
  const hashIndex = href.indexOf('#')
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1)
}