const ua = navigator.userAgent

const browser = {
  chrome: !!window.chrome,
  weixin: /MicroMessenger/i.test(ua),
  android: /Android/i.test(ua),
  ios: /iPhone|iPad|iPod/i.test(ua)
}