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

export { reactive, readonly, shallowReactive, shallowReadonly };
//# sourceMappingURL=reactivity.esm-bundler.js.map
