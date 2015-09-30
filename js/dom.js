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