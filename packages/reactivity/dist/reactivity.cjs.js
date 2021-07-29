'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isObject = function (target) {
    return typeof target === 'object' && target !== null;
};

// import {isObject} from "../../shared/src/index";
var mutableHandlers = {};
var shallowReactiveHandlers = {};
var readonlyHandlers = {};
var shallowReadonlyHandlers = {};
function reactive(target) {
    return createReactiveObject(target, false, mutableHandlers);
}
function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers);
}
function readonly(target) {
    return createReactiveObject(target, false, readonlyHandlers);
}
function shallowReadonly(target) {
    return createReactiveObject(target, false, shallowReadonlyHandlers);
}
/**
 *
 * @param target
 * @param isReadonly
 * @param baseHandler
 */
function createReactiveObject(target, isReadonly, baseHandler) {
    if (isObject(target)) {
        return target;
    }
    new Proxy(target, baseHandler);
}

exports.reactive = reactive;
exports.readonly = readonly;
exports.shallowReactive = shallowReactive;
exports.shallowReadonly = shallowReadonly;
//# sourceMappingURL=reactivity.cjs.js.map
