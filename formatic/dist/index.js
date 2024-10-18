'use strict';

var react = require('react');

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

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function debounce(func, wait) {
    var timeout;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timeout);
        timeout = setTimeout(function () { return func.apply(void 0, args); }, wait);
    };
}
function Text(initialValue, validate, useDebounce, debounceWait) {
    if (initialValue === void 0) { initialValue = ""; }
    if (useDebounce === void 0) { useDebounce = true; }
    if (debounceWait === void 0) { debounceWait = 300; }
    var _a = react.useState(initialValue), value = _a[0], setValue = _a[1];
    var _b = react.useState(null), error = _b[0], setError = _b[1];
    react.useEffect(function () {
        setValue(initialValue);
    }, [initialValue]);
    var validateValue = react.useCallback(function (newValue) {
        if (validate) {
            setError(validate(newValue));
        }
    }, [validate]);
    var debouncedValidate = react.useCallback(debounce(function (newValue) {
        validateValue(newValue);
    }, debounceWait), [validateValue, debounceWait]);
    var onChange = react.useCallback(function (event) {
        var newValue = event.target.value;
        setValue(newValue);
        if (useDebounce) {
            debouncedValidate(newValue);
        }
        else {
            validateValue(newValue);
        }
    }, [debouncedValidate, validateValue, useDebounce]);
    var reset = react.useCallback(function () {
        setValue(initialValue);
        setError(null);
    }, [initialValue]);
    return {
        value: value,
        error: error,
        onChange: onChange,
        reset: reset,
    };
}
function Toggle(initialValue, validate) {
    if (initialValue === void 0) { initialValue = false; }
    var _a = react.useState(initialValue), value = _a[0], setValue = _a[1];
    var _b = react.useState(null), error = _b[0], setError = _b[1];
    var onChange = react.useCallback(function (newValue) {
        setValue(newValue);
        if (validate) {
            setError(validate(newValue));
        }
    }, [validate]);
    var reset = react.useCallback(function () {
        setValue(initialValue);
        setError(null);
    }, [initialValue]);
    return {
        value: value,
        error: error,
        onChange: onChange,
        reset: reset,
    };
}
function List(spec, initialState) {
    if (initialState === void 0) { initialState = []; }
    var _a = react.useState(initialState), items = _a[0], setItems = _a[1];
    var addItem = react.useCallback(function () {
        var newItem = create(spec);
        setItems(function (prevItems) { return __spreadArray(__spreadArray([], prevItems, true), [newItem], false); });
        return items;
    }, [spec]);
    var removeItem = react.useCallback(function (index) {
        setItems(function (prevItems) { return prevItems.filter(function (_, i) { return i !== index; }); });
        return items;
    }, []);
    var reset = react.useCallback(function () {
        setItems(initialState);
    }, [initialState]);
    return {
        items: items,
        addItem: addItem,
        removeItem: removeItem,
        reset: reset,
    };
}
function Group(spec, initialState) {
    return create(spec, initialState);
}
function create(spec, initialState) {
    var state = (initialState || {});
    for (var key in spec) {
        if (Object.prototype.hasOwnProperty.call(spec, key)) {
            state[key] =
                typeof spec[key] === "function" ? spec[key]() : spec[key];
        }
    }
    return state;
}
var useInit = function (spec) {
    var _a = react.useState(function () { return spec; }), state = _a[0], setState = _a[1];
    var updateState = react.useCallback(function (key, value) {
        setState(function (prevState) {
            var _a;
            return (__assign(__assign({}, prevState), (_a = {}, _a[key] = __assign(__assign({}, prevState[key]), { value: value }), _a)));
        });
    }, []);
    var reset = react.useCallback(function () {
        setState(spec);
    }, [spec]);
    return __assign(__assign({}, state), { updateState: updateState, reset: reset });
};

exports.Group = Group;
exports.List = List;
exports.Text = Text;
exports.Toggle = Toggle;
exports.useInit = useInit;
//# sourceMappingURL=index.js.map
