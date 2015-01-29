
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

// isSupportOverflowScrolling: "WebkitOverflowScrolling" in document.documentElement.style