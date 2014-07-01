function loadScript(url, callback) {
    var script = document.createElement("script");
    var head = document.getElementsByTagName("head")[0];
    if (script.readyState) { //IE
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
                head.removeChild(script);
            }
        };
    } else { //Others
        script.onload = function() {
            callback();
            head.removeChild(script);
        };
    }
    script.src = url;
    head.appendChild(script);
}
