// element.insertAdjacentHTML(position, text);
// beforeBegin：在该元素前插入
// afterBegin：在该元素第一个子元素前插入
// beforeEnd：在该元素最后一个子元素后面插入
// afterEnd：在该元素后插入

// createElement
// appendChild
// removeChild

// document.getElementsByTagName returns nodeList
// in html document nodeList is htmlCollection

// document.head是html5新定义的
var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
var body = document.body;

var pageHeight = document.body.scrollHeight;

var scrollX = window.pageXOffset || (document.documentElement && document.documentElement.scrollLeft) || document.body.scrollLeft;

var viewportWidth = window.innerWidth || (document.documentElement && document.documentElement.clientWidth) || document.body.clientWidth;


// nodeList to array
var toArray = function(nodes) {
    var ret = [],
        slice = [].slice;
    try {
        ret = slice.call(nodes, 0);
    } catch (e) {
        for (var i = 0; i < nodes.length; i++) {
            ret.push(nodes[i]);
        }
    }
};

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


/**
 * 获取元素偏移量
 */
function getElementLeft(element) {
    var actualLeft = element.offsetLeft
    var current = element.offsetParent
    while (current !== null) {
        actualLeft += current.offsetLeft
        current = current.offsetParent
    }
    return actualLeft
}

function getElementTop(element) {
    var actualTop = element.offsetTop
    var current = element.offsetParent
    while (current !== null) {
        actualTop += current.offsetTop
        current = current.offsetParent
    }
    return actualTop
}
