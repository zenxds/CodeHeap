function isArraylike( obj ) {
    var length = obj.length,
        type = jQuery.type( obj );

    if ( type === "function" || jQuery.isWindow( obj ) ) {
        return false;
    }

    if ( obj.nodeType === 1 && length ) {
        return true;
    }

    return type === "array" || length === 0 ||
        typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}

function sortBy(target, fn, scope) {
    var array = target.map(function(item, index) {
        return {
            el: item,
            re: fn.call(scope, item, index)
        };
    }).sort(function(left, right) {
        var a = left.re,
            b = right.re;

        return a < b ? -1: a > b ? 1 : 0;
    });

    return array.map(function(item) {
        return item.el;
    });
}