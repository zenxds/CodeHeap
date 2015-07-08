var ua = navigator.userAgent;

var env = {
    weixin: /MicroMessenger/i.test(ua),
    android: /Android/i.test(ua),
    ios: /iPhone|iPad|iPod/i.test(ua)
};