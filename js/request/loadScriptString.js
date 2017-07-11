function loadScriptString(code) {
  const script = document.createElement("script")

  try {
    script.appendChild(document.createTextNode(code))
  } catch (ex) {
    script.text = code
  }

  document.body.appendChild(script)
}