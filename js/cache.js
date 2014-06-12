function Cache(name) {
    this.cache = {};
}

Cache.prototype = {

    set: function(key, val) {
        this.cache[key] = val;
        return this;
    },

    get: function(key) {
        return key === undefined ? this.getAll() : this.cache[key];
    },

    getAll: function() {
        return this.cache;
    },

    remove: function(key) {
        delete this.cache[key];
        return this;
    },

    clear: function() {
        delete this.cache;
        this.cache = {};
        return this;
    }

};