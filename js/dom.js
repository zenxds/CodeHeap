// element.insertAdjacentHTML(position, text);
// beforeBegin：在该元素前插入
// afterBegin：在该元素第一个子元素前插入
// beforeEnd：在该元素最后一个子元素后面插入
// afterEnd：在该元素后插入

// createElement
// appendChild
// removeChild

var doc = document;
var de = doc.documentElement;

var pageHeight = doc.body.scrollHeight;

var scrollX = window.pageXOffset || (de && de.scrollLeft) || doc.body.scrollLeft;

var viewportWidth = window.innerWidth || (de && de.clientWidth) || doc.body.clientWidth;

var $window = $(window);
var winWidth = $window.width();
var winHeight = $window.height();
var scrollTop = $window.scrollTop();
$window.on("resize", S.debounce(function() {
    var winNewWidth = $window.width();
    var winNewHeight = $window.height();
    // IE678 莫名其妙触发 resize
    // http://stackoverflow.com/questions/1852751/window-resize-event-firing-in-internet-explorer
    if (winWidth !== winNewWidth || winHeight !== winNewHeight) {
        S.trigger("window.resize", winNewWidth, winNewHeight);
    }
    winWidth = winNewWidth;
    winHeight = winNewHeight;
}, 80)).on("scroll", S.debounce(function() {
    var scrollNewTop = $window.scrollTop();
    if (scrollTop !== scrollNewTop) {
        S.trigger("window.scroll", scrollNewTop, scrollTop);
    }

    scrollTop = scrollNewTop;
}, 80));