var getData = function() {
    var deferred = $.Deferred();

    $.getJSON(api, function(data){
        deferred.resolve(data[0]);
    });

    return deferred.promise();
}

var getImg = function(src) {
    var deferred = $.Deferred();

    var img = new Image();

    img.onload = function() {
        deferred.resolve(img);
    };

    img.src = src;

    return deferred.promise();
}

var showImg = function(img) {
    $(img).appendTo($('#container'));
}

getData()
.then(getImg)
.then(showImg);