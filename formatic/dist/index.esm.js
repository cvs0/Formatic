import { useState } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function Text(initialValue) {
    if (initialValue === void 0) { initialValue = ""; }
    var _a = useState(initialValue), value = _a[0], setValue = _a[1];
    return {
        value: value,
        onChange: function (event) {
            setValue(event.target.value);
        },
    };
}
function Toggle(initialValue) {
    if (initialValue === void 0) { initialValue = false; }
    var _a = useState(initialValue), value = _a[0], setValue = _a[1];
    return {
        value: value,
        onChange: function (newValue) {
            setValue(newValue);
        },
    };
}
function List(spec) {
    var items = [];
    return {
        items: items,
        addItem: function () {
            var newItem = create(spec);
            items.push(newItem);
            return items;
        },
        removeItem: function (index) {
            items.splice(index, 1);
            return items;
        },
    };
}
function Group(spec) {
    return create(spec);
}
function create(spec) {
    var state = {};
    for (var key in spec) {
        state[key] = typeof spec[key] === "function" ? spec[key]() : spec[key];
    }
    return state;
}
var useInit = function (spec) {
    var _a = useState(function () { return spec; }), state = _a[0], setState = _a[1];
    var updateState = function (key, value) {
        setState(function (prevState) {
            var _a;
            return (__assign(__assign({}, prevState), (_a = {}, _a[key] = __assign(__assign({}, prevState[key]), { value: value }), _a)));
        });
    };
    return __assign(__assign({}, state), { updateState: updateState });
};

export { Group, List, Text, Toggle, useInit };
//# sourceMappingURL=index.esm.js.map
