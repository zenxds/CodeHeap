(function(win) {
  /**
   * 曾经出现过的问题：
   * vivo 云手机出现过无法改默认viewport的情况
   * 小米2 三星4.1.1 在手淘webview下面加此target-densitydpi=device-dpi属性线可细，但是会出现闪屏，故需加默认的viewport meta
   * ios 6.0.1的width需重置，否则会继承上一次的width值
   * iphone6 width由原来375变为750时，屏幕可左右滑动
   * 中兴 ZTEU930 对rem的计算有问题 1rem != html font-size = font-size
   * 魅族 M531 4.4.4 对rem的计算有问题 1rem != html 约等于 1.05 html的font-size
   */
  var docEl = document.documentElement;
  var fontEl = document.createElement('style');


  function setUnitA() {
    var docWidth = docEl.clientWidth;
    var extraStyle = '}';

    //如果是pc pc上宽度一般是1024以上 ipad的分辨率宽度1024 ipad就让其满屏显示 其余pc上显示640居中
    if (!navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i) && docWidth > 1024) {
      docWidth = 640;
      //仅pc下body为640 且居中
      extraStyle = ';max-width:' + docWidth + 'px;margin-right:auto!important;margin-left:auto!important;}';
    }

    win.rem = docWidth / 10;

    //ZTE 中兴 ZTE U930_TD/1.0 Linux/2.6.39/Android/4.0Release/3.5.2012 Browser/AppleWebkit534.30
    //老机器bug rem计算不是标准=html fontsize
    if (/ZTE U930_TD/.test(navigator.userAgent)) {
      win.rem = win.rem * 1.13;
    }

    //魅族 M351对应实验室的E6机器
    //注意 魅族 5.0.1 是正常的 不需要 hack
    //Mozilla/5.0(Linux; Android 4.4.4; M351 Build/KTU84p) AppleWebKit/537.36(KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36 AliApp(TB/5.2.7.2) WindVane/6.4.0 1080X1800 GCanvas/1.4.2.17
    if (/Android\s+4\.4\.4;\s+M351\s/.test(navigator.userAgent)) {
      win.rem = win.rem / 1.05;
    }

    // 但在MX4的机器上 还有另外一个问题
    // Mozilla/5.0(Linux;Android 5.0.1;MX4 Pro Build/LRX22C) AppleWebKit/537.36(KHTML,like Gecko) Version/4.0 Chrome/40.0.2214.114 Mobile Safari/537.36 AliApp(TB/5.5.0) WindVane/8.0.0 1536X2560 GCanvas/1.4.2.21
    if (/Android\s+5\.0\.1;\s+MX4\s/.test(navigator.userAgent)) {
      win.rem = win.rem * 1.06382;
    }

    fontEl.innerHTML = 'html{font-size:' + win.rem + 'px!important;}body{font-size:' + 12 * (docWidth / 320) + 'px' + extraStyle;
  }

  docEl.firstElementChild.appendChild(fontEl);

  win.addEventListener('resize', function() {
    //resize时立刻change,pad上刷屏明显
    setUnitA();
  }, false);


  win.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      setUnitA();
    }
  }, false);

  setUnitA();

})(window);