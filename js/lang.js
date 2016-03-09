// var isObject = isType("Object")
// var isArray = Array.isArray || isType("Array")
function isType(type) {
    return function(obj) {
        return {}.toString.call(obj) == "[object " + type + "]";
    };
}

var each = function(object, fn, context) {
    var i = 0,
        length = object.length;

    if (context) {
        fn = fn.bind(context);
    }
    if (length === +length) {
        for (; i < length; i++) {
            if (fn(object[i], i, object) === false) {
                break;
            }
        }
    } else {
        for (i in object) {
            if (object.hasOwnProperty(i) && (fn(object[i], i, object) === false)) {
                break;
            }
        }
    }
};

var memoize = function(fn, hasher) {
    var memo = {};

    // 默认拿第一个传入的参数做key
    hasher = hasher || function(val) {
        return val;
    };

    return function() {
        var args = arguments,
            key = hasher.apply(this, args),
            val = memo[key];

        // 必须有返回结果才缓存
        return memo.hasOwnProperty(key) && val != null ? memo[key] : (memo[key] = fn.apply(this, args));
    };
};

var substitute = function(str, o) {
    return str.replace(/\\?\{\{\s*([^{}\s]+)\s*\}\}/g, function(match, name) {
        if (match.charAt(0) === '\\') {
            return match.slice(1);
        }
        return (o[name] == null) ? '' : o[name];
    });
};

/**
 * 单例模式
 * return only one instance
 * @param  {Function} fn      the function to return the instance
 * @return {Function}
 */
var singleton = function(fn) {
    return memoize(fn, function() {
        return 1;
    });
};

// 深拷贝
var deepCopy = function(src, target) {
    if (!src || typeof src !== "object") {
        return src;
    }

    target = target || src.constructor === Array ? [] : {};

    for (var i in src) {
        if (src.hasOwnProperty(i)) {
            target[i] = typeof src[i] === "object" ? deepCopy(src[i]) : src[i];
        }
    }
    return target;
};

var extend = function(target) {
    var args = [].slice.call(arguments);
    var length = args.length;
    var source, prop;

    for (var i = 1; i < length; i++) {
        source = args[i];

        for (prop in source) {
            if (source.hasOwnProperty(prop)) {
                target[prop] = source[prop];
            }
        }
    }
    return target;
};

/*
 * 返回m-n之间的随机数，并取整,
 * 包括m, 不包括n - floor, ceil相反
 * 也可以传入数组，随机返回数组某个元素
 */
var choice = function(m, n) {
    var array,
        random;

    if (isArray(m)) {
        array = m;
        m = 0;
        n = array.length;
    }

    if (m > n) {
        m = [n, n = m][0];
    }

    random = Math.floor(Math.random() * (n - m) + m);

    return array ? array[random] : random;
};

/*
 * http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 * 洗牌算法
 * 多次运行测试是否足够随机
 * test code: https://gist.github.com/4507739
 */
var shuffle = function(array) {
    if (!isArray(array)) {
        return [];
    }

    var length = array.length,
        i = length,
        temp,
        j;

    if (length === 0) {
        return [];
    }

    while (--i) {
        j = choice(0, i + 1);

        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        // array[i] = [array[j], array[j] = array[i]][0];
    }
    return array;
};


// 是否是闰年
var isLeapYear = function(date) {
    return new Date(date.getFullYear(), 2, 0).getDate() == 29;
};

// 保留两位小数
var getter = function(val) {
    return Math.round(val * 100)/100;
};


var poll = function(fn, interval, timeout) {
    timeout = timeout || 10000;
    interval = interval || 200;

    var defer = Promise.defer();

    var result = fn();
    if (result) {
        defer.resolve(result);
    } else {
        var cost = 0;
        var timer = setInterval(function() {
            cost += interval;

            result = fn();
            if (result) {
                clearInterval(timer);
                defer.resolve(result);
            } else {
                if (cost >= timeout) {
                    clearInterval(timer);
                    defer.reject();
                }
            }
        }, interval);
    }

    return defer.promise;
};

var log = function(url) {
    var img = new Image();

    var random = '_img_' + Math.random();
    win[random] = img;

    img.onload = img.onerror = function() {
        win[random] = null;
    };
    img.src = url;
}

(function() {
    const isObject = isType('Object')
    const isArray = Array.isArray || isType('Array')

    var isPlainObject = obj => (isObject(obj) && (Object.getPrototypeOf(obj) === Object.prototype))

    function merge(target) {
        target = target || {}
        var sources = [].slice.call(arguments, 1)

        sources.forEach(source => {
            source = source || {}

            for (var key in source) {
                var src = target[key]
                var copy = source[key]

                if (src === copy) {
                    continue
                }

                if (isArray(copy)) {
                    target[key] = merge(isArray(src) ? src : [], copy)
                } else if (isPlainObject(copy)) {
                    target[key] = merge(isPlainObject(src) ? src : {}, copy)
                } else if (copy !== undefined) {
                    target[key] = copy
                }
            }
        })

        return target;
    }

    function isType(type) {
        return obj => ({}.toString.call(obj) == '[object ' + type + ']')
    }

    module.exports = {
        merge: merge
    }
})
