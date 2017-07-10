import underscored from '../underscored'

const dasherize = str => {
  return underscored(str).replace(/_/g, '-')
}

export default dasherize