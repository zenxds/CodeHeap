/**
 * simulate dom event
 */
var win = global;
var doc = global.document;

function simulate(element, eventName, options) {
    var defaultOptions = {
        pointerX: 0,
        pointerY: 0,
        clientX: 0,
        clientY: 0,
        screenX: 0,
        screenY: 0,
        button: 0,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        bubbles: true,
        cancelable: true,
        view: doc.defaultView || win,
        detail: 1,
        relateTarget: null,

        // for key event
        code: '',
        charCode: 0,
        key: '',
        keyCode : 0,
        which: 0,
        location: 0
    };

    var eventMatchers = {
        'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
        'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/,

        // dom3
        'KeyboardEvent': /^(?:key(?:down|up|press))$/,
        'UIEvent': /^(?:touch(?:start|move|end|cancel))$/
    };
    var options = extend(defaultOptions, options || {});

    var oEvent, eventType = null;

    for (var name in eventMatchers) {
        if (eventMatchers[name].test(eventName)) {
            eventType = name;
            break;
        }
    }

    if (!eventType) {
        throw new SyntaxError('event ' + eventName + ' are not supported');
    }

    if (doc.createEvent) {

        if (eventType == 'HTMLEvents') {
            oEvent = doc.createEvent(eventType);
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        }

        if (eventType == 'MouseEvents'){
            oEvent = doc.createEvent(eventType);
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, options.view,
                options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
                options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }

        // dom3
        if (eventType == 'KeyboardEvent' && win.KeyboardEvent) {
            oEvent = new KeyboardEvent(eventName, options);
        }

        if (eventType == 'UIEvent' && win.UIEvent) {
            oEvent = new UIEvent(eventName, options);

            if (/touch/.test(eventName)) {
                oEvent.touches = options.touches || [{
                    pageX: 0,
                    pageY: 0,
                    clientX: 0,
                    clientY: 0,
                    screenX: 0,
                    screenY: 0
                }];
                oEvent.changedTouches = options.changedTouches || [{
                    pageX: 0,
                    pageY: 0,
                    clientX: 0,
                    clientY: 0,
                    screenX: 0,
                    screenY: 0
                }];
            }
        }

        if (oEvent) {
            element.dispatchEvent(oEvent);
        }
    } else {
        var evt = doc.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
}


module.exports = simulate;

// simulate(document.getElementById("btn"), "click");