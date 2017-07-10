var head = document.head || document.getElementsByTagName("head")[0];
var win = window;
var doc = document;

function loadScript(url, callback) {
  var node = doc.createElement("script");

  node.charset = "utf-8";
  node.async = true;

  if ("onload" in node) {
    node.onload = onload;
  } else {
    node.onreadystatechange = function () {
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
  var node = doc.createElement('link');

  node.charset = 'utf-8';
  node.rel = 'stylesheet';

  var supportOnload = 'onload' in node;
  if (isOldWebKit && !supportOnload) {
    setTimeout(function () {
      pollCss(node, callback);
    }, 1);
  }

  if (supportOnload) {
    node.onload = onload;
  } else {
    node.onreadystatechange = function () {
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

function loadScriptString(code) {
  var script = doc.createElement("script")

  try {
    script.appendChild(doc.createTextNode(code))
  } catch (ex) {
    script.text = code
  }

  doc.body.appendChild(script)
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

  setTimeout(function () {
    if (isLoaded) {
      // Place callback here to give time for style rendering
      callback();
    } else {
      pollCss(node, callback);
    }
  }, 20);
}