var ua = navigator.userAgent;

var env = {
    chrome: !!window.chrome,

    weixin: /MicroMessenger/i.test(ua),
    android: /Android/i.test(ua),
    ios: /iPhone|iPad|iPod/i.test(ua),
    oldIE: function () {
        var b = document.createElement('b');
        b.innerHTML = '<!--[if lte IE 7]><i></i><![endif]-->';
        return b.getElementsByTagName('i').length === 1;
    }
};