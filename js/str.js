// 可以使用 \x 加 2位16进制字符标记一个单字节的字符
// 例如字符 'a' 可以表示为 \x61，用法类似\u 加4位16进制编码。
// \u 加四位十六进制数 或 \x 加2位十六进制数属于转义字符，在 js 字符串长度中只算 1 个

// \ 开始后接正数，可能被解析为8进制转义字符
// 一个八进制转义字符形成的条件是：斜线后面接的整数最长3位，至少1位，单个数字的字面值不大于8。
// 八进制转义字符的10进制数字字面值最大值为377(即10进制的255)，即 '\377' 被解析为一个字符，'\378' 被解析为2个字符： '\37' 和 '8'

// 字节长度
// 默认一个汉字占2字节
// 但可以定制
// 比如mysql存储时使用的是3个字节
var byteLength = function(str, fix) {
    fix = fix || 2;

    return String(str).replace(/[^\x00-\xff]/g, new Array(fix + 1).join("-")).length;
};

// from uglify
function to_ascii(str) {
    return str.replace(/[\u0080-\uffff]/g, function(ch) {
        var code = ch.charCodeAt(0).toString(16);
        if (code.length <= 2) {
            while (code.length < 2) code = "0" + code;
            return "\\x" + code;
        } else {
            while (code.length < 4) code = "0" + code;
            return "\\u" + code;
        }
    });
}

/**
 * 计算js字符串所占的字节数
 */
function byteCount(s) {
    return encodeURI(s).split(/%..|./).length - 1;
}

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
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
function escapeRegExp(string){
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function doc (fn) {
    // 1. 移除起始的 function(){ /*!
    // 2. 移除末尾的 */ }
    // 3. 移除起始和末尾的空格
    return fn.toString()
        .replace(/^[^\/]+\/\*!?/, '')
        .replace(/\*\/[^\/]+$/, '')
        .trim()
},