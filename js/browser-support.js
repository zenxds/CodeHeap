var canvasElem = document.createElement('canvas');

var support = {
	"plugins": !!navigator.plugins,
	"mimeTypes": !!navigator.mimeTypes,


	// IE特有，10及以下版本
	"createEventObject": !!document.createEventObject,

	// IE8及以上
	"Event": !!window.Event,
	"JSON": !!(window.JSON && JSON.stringify),
	"localStorage": !!window.localStorage,
	"postMessage": !!window.postMessage,
	"hashchange": "onhashchange" in window,
	"XMLHttpRequest.prototype": !!(typeof XMLHttpRequest !== "undefined" && XMLHttpRequest.prototype && XMLHttpRequest.prototype.open),
	// "CORS": 'withCredentials' in new XMLHttpRequest() || typeof XDomainRequest !== "undefined",

	// IE9及以上
	"HTMLElement.prototype": !!(typeof HTMLElement !== "undefined" && HTMLElement.prototype && HTMLElement.prototype.appendChild),
	"canvas": !!(canvasElem.getContext && canvasElem.getContext('2d')),
	"es5": !!Function.prototype.bind,
	"createEvent": !!document.createEvent,
	// dom3 Event
	"UIEvent": !!window.UIEvent,
	"KeyboardEvent": !!window.KeyboardEvent,
	"CustomEvent": !!window.CustomEvent,

	// IE10及以上
	"atob": !!window.atob,
	"btoa": !!window.btoa,
	"CORS": 'withCredentials' in new XMLHttpRequest(),

	"mediaDevices": !!(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices),

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