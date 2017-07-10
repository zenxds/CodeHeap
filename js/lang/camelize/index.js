const camelize = str => {
  return str.replace(/[-_][^-_]/g, function(match) {
    return match.charAt(1).toUpperCase()
  })
}

export default camelize