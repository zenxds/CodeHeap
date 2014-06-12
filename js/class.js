// oo实现
var Class = function(parent, properties) {
    if (!this instanceof Class) {
        return new Class(parent, properties);
    }
    if (!S.isFunction(parent)) {
        properties = parent;
        parent = null;
    }
    properties = properties || {};

    var klass = function() {
        if (parent) {
            parent.apply(this, arguments);
        }
        if (this.constructor === klass && this.init) {
            this.init.apply(this, arguments);
        }
    };

    if (parent) {
        // var subclass = function() {};
        // subclass.prototype = parent.prototype;
        // klass.prototype = new subclass();

        // or
        // mix(klass.prototype, parent.prototype);

        // 继承静态属性
        // mix(klass, parent);

        var proto = createProto(parent.prototype);
        mix(proto, klass.prototype);
        klass.prototype = proto;

        // ClassA.superclass.method显示调用父类方法
        klass.superclass = parent.prototype;
    }

    // klass.prototype.init = function() {}; // need to be overwrite
    klass.fn = klass.prototype;
    klass.fn.constructor = klass;

    mix(klass, Class.Mutators);
    klass.fn.proxy = klass.proxy;

    // klass.Implements(makeArray(properties['Implements']));
    return klass.include(properties);
};

// Shared empty constructor function to aid in prototype-chain creation.

function Ctor() {}
// See: http://jsperf.com/object-create-vs-new-ctor
var createProto = Object.__proto__ ? function(proto) {
        return {
            __proto__: proto
        };
    } : function(proto) {
        Ctor.prototype = proto;
        return new Ctor();
    };

Class.Mutators = {
    extend: function(properties) {
        // var extended = object.extended;

        mix(this, properties);

        // if (extended) {
        //     extended(this);
        // }
        return this;
    },
    include: function(properties) {
        // var included = object.included;
        var fn = this.prototype;
        var Mutators = Class.Mutators;

        var key, value;
        for (key in properties) {
            value = properties[key];
            if (hasOwnProperty(Mutators, key)) {
                Mutators[key].call(this, value);
            } else {
                fn[key] = value;
            }
        }

        // mix(this.prototype, properties);

        // if (included) {
        //     included(this);
        // }
        return this;
    },
    proxy: function(fn) {
        return fn.bind(this);
    },
    Implements: Implements
};

function Implements(items) {
    items = makeArray(items);
    var proto = this.prototype || this;

    items.forEach(function(item) {
        mix(proto, item.prototype || item, ['prototype']);
    });
    return this;
}

function classify(cls) {
    cls.Implements = Implements;
    return cls;
}