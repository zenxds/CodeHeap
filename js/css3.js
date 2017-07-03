
function transitionEnd() {
    var el = document.createElement('bootstrap');

    var transEndEventNames = {
        WebkitTransition : 'webkitTransitionEnd',
        MozTransition    : 'transitionend',
        OTransition      : 'oTransitionEnd otransitionend',
        transition       : 'transitionend'
    };

    for (var name in transEndEventNames) {
        if (el.style[name] !== undefined) {
            return transEndEventNames[name];
        }
    }

    return transEndEventNames.transition;
}

function getAnimationendEvent() {
  const el = document.createElement("fakeelement")
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

// isSupportOverflowScrolling: "WebkitOverflowScrolling" in document.documentElement.style