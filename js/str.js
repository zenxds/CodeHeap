// 字节长度
// 默认一个汉字占2字节
// 但可以定制
// 比如mysql存储时使用的是3个字节
var byteLength = function(str, fix) {
    fix = fix || 2;

    return String(str).replace(/[^\x00-\xff]/g, new Array(fix + 1).join("-")).length;
};

// 字符串截断， 超出省略号
var truncate = function(str, length, truncation) {
    length = length || 30;

    truncation = truncation || "...";

    return str.length > length ?
        str.slice(0, length - truncation.length) + truncation: str;
};

// - _
// 转为驼峰风格
var camelize = function(str){
    if (str.indexOf("-") < 0 && str.indexOf("_") < 0) {
        return str;
    }
    return str.replace(/[-_][^-_]/g, function(match) {
        return match.charAt(1).toUpperCase();
    });
};

// 转为下划线风格
var underscored = function(str) {
    return str.replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/\-/g, "_").toLowerCase();
};

// 转为连字符风格
var dasherize = function(str) {
    return underscored(str).replace(/_/g, "-");
};

// 去除字符串中的html标签
var stripTags = function(str) {
    return (str + "").replace(/<[^>]+>/g, "");
};

// 另一种实现
// var html = "<p>Some HTML</p>";
// var div = document.createElement("div");
// div.innerHTML = html;
// var text = div.textContent || div.innerText || "";

// 去除字符串中的script
var stripScripts = function(str) {
    return (str + "").replace(/<script[^>]*>([\S\s]*?)<\/script>/img, "");
};


// 把字符串转为安全的正则源码
var escapeRegExp = function(str) {
    return str.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
};