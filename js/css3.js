const el = document.createElement("fakeelement")

export const transitionEnd = () => {
  const transitions = {
    WebkitTransition : 'webkitTransitionEnd',
    MozTransition    : 'transitionend',
    OTransition      : 'oTransitionEnd otransitionend',
    transition       : 'transitionend'
  }

  for (let i in transitions) {
    if (el.style[i] !== undefined) {
      return transitions[i]
    }
  }
}

export const animationendEvent = () => {
  const animations = {
    "animation"      : "animationend",
    "OAnimation"     : "oAnimationEnd",
    "MozAnimation"   : "animationend",
    "WebkitAnimation": "webkitAnimationEnd"
  }

  for (let i in animations) {
    if (el.style[i] !== undefined) {
      return animations[i]
    }
  }  
}