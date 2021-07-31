var VueReactivity = (function (exports) {
  'use strict';

  var isObject = function (target) {
      return typeof target === 'object' && target !== null;
  };

  function createGetter(isReadonly, shallow) {
      if (shallow === void 0) { shallow = false; }
      return function get(target, key, receiver) {
          if (isObject(target[key]) && !shallow) {
              return reactive(target[key]);
          }
          console.log('读取了', key);
          return target[key];
      };
  }
  function createSetter(isShallow) {
      return function set(target, key, value, receiver) {
          console.log(key + "\u7684set\u8C03\u7528\u4E86, \u7B49\u5F85\u89C6\u56FE\u66F4\u65B0");
      };
  }
  var get = createGetter();
  var shallowGet = createGetter(false, true);
  var readonlyGet = createGetter();
  var shallowReadonlyGet = createGetter(true, true);
  var set = createSetter();
  var shallowSet = createSetter();
  var readonlySet = {
      set: function (target, key) {
          console.warn("cannot set " + key + " on a readonly target " + JSON.stringify(target));
      }
  }; // 我也不知道为啥要写成对象，然后用Object.assign合并
  var mutableHandlers = {
      get: get,
      set: set
  };
  var shallowReactiveHandlers = {
      get: shallowGet,
      set: shallowSet
  };
  var readonlyHandlers = Object.assign({
      get: readonlyGet,
  }, readonlySet);
  var shallowReadonlyHandlers = Object.assign({
      get: shallowReadonlyGet
  }, readonlySet);

  // import {isObject} from "../../shared/src/index";
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
  var reactiveMap = new WeakMap();
  var readonlyMap = new WeakMap();
  function createReactiveObject(target, isReadonly, baseHandler) {
      if (!isObject(target)) {
          return target;
      }
      var proxyMap = isReadonly ? readonlyMap : reactiveMap;
      var existProxy = proxyMap.get(target);
      if (existProxy) {
          return existProxy;
      }
      var newProxy = new Proxy(target, baseHandler);
      proxyMap.set(target, newProxy);
      return newProxy;
  }

  exports.reactive = reactive;
  exports.readonly = readonly;
  exports.shallowReactive = shallowReactive;
  exports.shallowReadonly = shallowReadonly;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
//# sourceMappingURL=reactivity.global.js.map
