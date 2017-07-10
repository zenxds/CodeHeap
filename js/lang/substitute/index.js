const substitute = (str, o) => {
  return str.replace(/\\?\{\{\s*([^{}\s]+)\s*\}\}/g, function (match, name) {
    if (match.charAt(0) === '\\') {
      return match.slice(1)
    }
    return (o[name] == null) ? '' : o[name]
  })
}

export default substitute