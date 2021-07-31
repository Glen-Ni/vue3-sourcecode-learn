import {isObject} from "@vue/shared";
import {reactive} from "./reactive";

function createGetter(isReadonly = false, shallow = false,) {
  return function get(target, key, receiver) {
    if( isObject(target[key]) && !shallow) {
      return reactive(target[key]);
    }
    console.log('读取了', key)
    return target[key]
  }
}

function createSetter(isShallow= false) {
  return function set(target, key,value, receiver) {
    console.log(`${key}的set调用了, 等待视图更新`)
  }
}

const get = createGetter();
const shallowGet = createGetter(false, true)
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)

const set = createSetter();
const shallowSet = createSetter(true)

const readonlySet = {
  set: function (target, key) {
    console.warn(`cannot set ${key} on a readonly target ${JSON.stringify(target)}`)
  }
} // 我也不知道为啥要写成对象，然后用Object.assign合并

export const mutableHandlers = {
  get,
  set
}
export const shallowReactiveHandlers = {
  get: shallowGet,
  set: shallowSet
}

export const readonlyHandlers = Object.assign({
  get: readonlyGet,
}, readonlySet)
export const shallowReadonlyHandlers = Object.assign({
  get: shallowReadonlyGet
}, readonlySet)