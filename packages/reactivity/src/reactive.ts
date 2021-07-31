// import {isObject} from "../../shared/src/index";
// 改为
import {isObject} from "@vue/shared";
import {mutableHandlers, readonlyHandlers, shallowReactiveHandlers, shallowReadonlyHandlers} from "./baseHandler";


export function reactive(target) {
  return createReactiveObject(target, false, mutableHandlers)
}

export function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers)
}

export function readonly(target) {
  return createReactiveObject(target, false, readonlyHandlers)
}

export function shallowReadonly(target) {
  return createReactiveObject(target, false, shallowReadonlyHandlers)
}

/**
 *
 * @param target
 * @param isReadonly
 * @param baseHandler
 */
const reactiveMap = new WeakMap();
const readonlyMap = new WeakMap();

function createReactiveObject(target, isReadonly, baseHandler) {
  if (!isObject(target)) {
    return target
  }
  const proxyMap = isReadonly ? readonlyMap : reactiveMap;
  const existProxy = proxyMap.get(target);
  if (existProxy) {
    return existProxy;
  }
  const newProxy = new Proxy(target, baseHandler)
  proxyMap.set(target, newProxy);
  return newProxy;
}