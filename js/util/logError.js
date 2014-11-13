(function(win) {

    function log(url, callback) {
        // 防止请求被垃圾回收
        var image = new Image(),
            id = "_img_" + Math.random();

        win[id] = image;
        image.onload = image.onerror = function() {
            win[id] = null;
            if (callback) {
                callback();
            }
        };
        image.src = url;
    }

    // 监听错误上报
    win.onerror = function(msg, url, line, col, e) {
        var data = {
            page: location.href,
            ua: navigator.userAgent,
            time: +new Date()
        };

        // 不一定所有浏览器都支持col参数
        // col = col || (win.event && win.event.errorCharacter) || 0;

        // 外部脚本错误， 且脚本与页面非同源
        // msg == "Script error."

        if (url) {
            data.url = url;
        }
        if (line) {
            data.line = line;
        }

        // 有堆栈信息使用堆栈信息
        if (e && e.stack) {
            data.msg = String(e.stack);
        } else {
            data.msg = msg;
        }

        var s = [],
            k;
        for (k in data) {
            s.push(k + "=" + encodeURIComponent(data[k]));
        }
        s = s.join("&");

        console.log(data);
        // console.log(s);
    };
})(window);

