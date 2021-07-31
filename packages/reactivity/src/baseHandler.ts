import {isObject} from "@vue/shared";
import {reactive, readonly} from "./reactive";

function createGetter(isReadonly = false, shallow = false,) {
  /**
   * target 原来对象
   * key 取啥属性
   * recevier 代理对象
   */
  return function get(target, key, receiver) {
    // if( isObject(target[key]) && !shallow) {
    //   return reactive(target[key]);
    // }
    console.log('【读取了】', key)
    const res = Reflect.get(target, key, receiver)
    if(!isReadonly) {
      console.log('读取，收集依赖更新视图', key);
    }
    if (shallow) {
      return res;
    }
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res);
    }
    return res;
  }
}

function createSetter(isShallow = false) {
  return function set(target, key, value, receiver) {
    const res = Reflect.set(target, key, value, receiver)
    console.log(`【设置了】${key}的set调用了, 等待视图更新`)
    return res
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