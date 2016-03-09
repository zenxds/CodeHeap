var head = document.head || document.getElementsByTagName("head")[0];
var win = window;
var doc = document;

function loadScript(url, callback) {
    var node = document.createElement("script");

    node.charset = "utf-8";
    node.async = true;

    if ("onload" in node) {
        node.onload = onload;
    } else {
        node.onreadystatechange = function() {
            if (/loaded|complete/.test(node.readyState)) {
                onload();
            }
        };
    }

    function onload() {
        node.onreadystatechange = node.onload = null;
        head.removeChild(node);
        node = null;
        callback();
    }

    node.src = url;
    head.appendChild(node);
}

var ua = navigator.userAgent;
var isOldWebKit = +ua.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i, "$1") < 536;

function loadCss(url, callback) {
    var node = document.createElement('link');

    node.charset = 'utf-8';
    node.rel = 'stylesheet';

    var supportOnload = 'onload' in node;
    if (isOldWebKit && !supportOnload) {
        setTimeout(function() {
            pollCss(node, callback);
        }, 1);
    }

    if (supportOnload) {
        node.onload = onload;
    } else {
        node.onreadystatechange = function() {
            if (/loaded|complete/.test(node.readyState)) {
                onload();
            }
        }
    }

    function onload() {
        node.onload = node.onreadystatechange = null;
        node = null;
        callback();
    }

    node.href = url;
    head.appendChild(node);

}

function pollCss(node, callback) {
    var sheet = node.sheet;
    var isLoaded;

    // for WebKit < 536
    if (isOldWebKit) {
        if (sheet) {
            isLoaded = true;
        }
    }
    // for Firefox < 9.0
    else if (sheet) {
        try {
            if (sheet.cssRules) {
                isLoaded = true;
            }
        } catch (ex) {
            // The value of `ex.name` is changed from "NS_ERROR_DOM_SECURITY_ERR"
            // to "SecurityError" since Firefox 13.0. But Firefox is less than 9.0
            // in here, So it is ok to just rely on "NS_ERROR_DOM_SECURITY_ERR"
            if (ex.name === "NS_ERROR_DOM_SECURITY_ERR") {
                isLoaded = true;
            }
        }
    }

    setTimeout(function() {
        if (isLoaded) {
            // Place callback here to give time for style rendering
            callback();
        }
        else {
            pollCss(node, callback);
        }
    }, 20);
}

var log = function(url) {
    var img = new Image();

    var random = '_img_' + String(Math.random()).substring(2);
    win[random] = img;

    img.onload = img.onerror = function() {
        win[random] = null;
    };
    img.src = url;
}


var jsonp = function(url, data) {
    var defer = Promise.defer();

    var script = doc.createElement("script"),
        fn = '_' + String(Math.random()).substring(2),
        param = [];

    param.push('data=' + encodeURIComponent(data));
    param.push('_callback=' + fn);
    // 构造URL
    url += url.indexOf('?') > 0 ? '&' : '?';
    url += param.join('&');

    script.src = url;
    win[fn] = function(d) {
        defer.resolve(d);

        try {
            head.removeChild(script);
            delete win[fn];
        } catch (e) {}
    };
    head.appendChild(script);

    return defer.promise;
}

var post = function(url, data) {
    var defer = Promise.defer();

    var supportCORS = typeof XMLHttpRequest !== "undefined" && 'withCredentials' in new XMLHttpRequest();

    if (!supportCORS) {
        defer.reject(new Error('client don\'t support CORS'));
        return defer.promise;
    }

    var xhr,
        method = 'POST',
        handler = function() {
            var text = xhr && xhr.responseText;
            defer.resolve(JSON.parse(text || '{}'));
        },
        onerror = function(e) {
            defer.reject(e);
        };

    try {
        xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.withCredentials = true;
        if (xhr.setRequestHeader) {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        }
        xhr.onload = handler;
        xhr.onerror = onerror;

        xhr.send('data=' + encodeURIComponent(data));
    } catch (e) {}

    return defer.promise;
}