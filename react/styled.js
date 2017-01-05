const styled = (Component, styler) => (props) => {
  const style = typeof styler === 'function' ? styler(props) : styler
  // react-native的style可以传入数组
  return <Component {...props} style={[ style, props.style ]} />
}