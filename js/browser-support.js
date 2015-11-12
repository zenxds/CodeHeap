var canvasElem = document.createElement('canvas');

var support = {
	// IE8及以上
	"localStorage": !!window.localStorage,
	"postMessage": !!window.postMessage,
	"XMLHttpRequest.prototype": !!(typeof XMLHttpRequest !== "undefined" && XMLHttpRequest.prototype && XMLHttpRequest.prototype.open),

	// IE9及以上
	"HTMLElement.prototype": !!(typeof HTMLElement !== "undefined" && HTMLElement.prototype && HTMLElement.prototype.appendChild),
	"canvas": !!(canvasElem.getContext && canvasElem.getContext('2d')),
	"es5": !!Function.prototype.bind,

	// IE11还不支持，edge才支持
	"promise": typeof Promise !== "undefined"
};



var result = document.getElementById('result');
var i;
for (i in support) {
	if (support.hasOwnProperty(i)) {
		result.innerHTML += ['<li>', i, ' -------- ', support[i], '</li>'].join('')
	}
}