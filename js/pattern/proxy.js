var myImage = (function(src) {
    var img = document.createElement("img");
    document.body.appendChild(img);

    return {
        setSrc: function(src) {
            img.src = src;
        }
    }
})();

var proxyImage = (function() {
    var img = new Image;
    img.onload = function(){
        myImage.setSrc(this.src);
    };

    return {
        setSrc: function(src) {
            // 设置loading图
            myImage.setSrc("loading image");

            img.src = src;
        }
    }
})();