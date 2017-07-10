function hasClass(elem, className) {
  if (!className) {
    return false
  }

  if (elem.classList) {
    return elem.classList.contains(className);
  } else {
    return (new RegExp('(\\s|^)' + className + '(\\s|$)')).test(elem.className);
  }
}

function addClass(elem, className) {
  if (!className || hasClass(elem, className)) {
    return
  }

  if (elem.classList) {
    elem.classList.add(className);
  } else {
    elem.className += " " + className;
  }
}

function removeClass(elem, className) {
  if (!className || !hasClass(elem, className)) {
    return
  }

  if (elem.classList) {
    elem.classList.remove(className);
  } else {
    elem.className = elem.className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ');
  }
}