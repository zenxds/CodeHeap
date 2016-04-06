/**
 * cookie module
 * export get/set/remove
 */

var MILLISECONDS_OF_DAY = 24 * 60 * 60 * 1000,

    encode = encodeURIComponent,

    decode = function(val) {
        return decodeURIComponent((val + '').replace(/\+/g, ' '));
    },

    isNotEmptyString = function(val) {
        return typeof val === 'string' && val !== '';
    };

module.exports = {
    /**
     * 获取 cookie 值
     * @return {string} 如果 name 不存在，返回 undefined
     */
    get: function(name) {
        var ret, m;

        if (isNotEmptyString(name)) {
            if ((m = String(document.cookie).match(
                new RegExp('(?:^| )' + name + '(?:(?:=([^;]*))|;|$)')))) {
                ret = m[1] ? decode(m[1]) : '';
            }
        }
        return ret;
    },

    set: function(name, val, domain, expires, path, secure) {
        var text = String(encode(val)),
            date = expires;

        // 从当前时间开始，多少天后过期
        if (typeof date === 'number') {
            date = new Date();
            date.setTime(date.getTime() + expires * MILLISECONDS_OF_DAY);
        }

        // expiration date
        if (date instanceof Date) {
            text += '; expires=' + date.toUTCString();
        }

        // domain
        if (isNotEmptyString(domain)) {
            text += '; domain=' + domain;
        }

        // path
        if (isNotEmptyString(path)) {
            text += '; path=' + path;
        }

        // secure
        if (secure) {
            text += '; secure';
        }

        document.cookie = name + '=' + text;
        return this;
    },

    remove: function(name, domain, path, secure) {
        // 置空，并立刻过期
        this.set(name, '', domain, -1, path, secure);
        return this;
    }
};