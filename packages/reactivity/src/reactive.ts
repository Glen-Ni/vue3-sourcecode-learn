// import {isObject} from "../../shared/src/index";
// 改为
import {isObject} from "@vue/shared";

const mutableHandlers = {}
const shallowReactiveHandlers = {}
const readonlyHandlers = {}
const shallowReadonlyHandlers = {}

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
function createReactiveObject(target, isReadonly, baseHandler) {
  if(isObject(target)){
    return target
  }
  new Proxy(target, baseHandler)
}