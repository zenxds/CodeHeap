
const head = document.head || document.getElementsByTagName('head')[0]
let interactiveScript

export default function getCurrentScript() {
  if (document.currentScript) {
    return document.currentScript
  }

  // For IE6-9 browsers, the script onload event may not fire right
  // after the script is evaluated. Kris Zyp found that it
  // could query the script nodes and the one that is in "interactive"
  // mode indicates the current script
  // ref: http://goo.gl/JHfFW
  if (interactiveScript && interactiveScript.readyState === "interactive") {
    return interactiveScript
  }

  let scripts = head.getElementsByTagName("script")

  for (let i = scripts.length - 1; i >= 0; i--) {
    let script = scripts[i]
    if (script.readyState === "interactive") {
      interactiveScript = script
      return interactiveScript
    }
  }

  return null
}