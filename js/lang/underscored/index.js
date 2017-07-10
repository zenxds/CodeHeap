const underscored = function(str) {
  return str.replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/\-/g, '_').toLowerCase()
}

export default underscored