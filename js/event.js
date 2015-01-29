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


$input.on("input change paste keyup propertychange", function() {

});