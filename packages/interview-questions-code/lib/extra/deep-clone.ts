/**
 * 正统做法，递归函数
 * JSON，普通对象可以，但是函数、递归、特殊引用类型会有问题
 * 通信，异步、浏览器
 *
 */
const cache = new WeakMap(); // 设置缓存，解决循环引用的问题
function deepClone(value) {
    if (typeof value !== "object" || value === null) {
        return value;
    }
    // value是对象
    if (cache.has(value)) {
        return value;
    }
    const result = Array.isArray(value) ? [] : {};
    Object.setPrototypeOf(result, Object.getPrototypeOf(value));
    cache.set(value, result);
    for (let key in value) {
        result[key] = deepClone(value[key]);
    }
    return result;
}
class Test {
    a: number;
    b: number;
    h: Test | undefined;
    constructor() {
        this.a = 1;
        this.b = 2;
    }
    c() {
        console.log("c");
    }
}
const obj = new Test();
obj.h = obj;
console.log(obj, deepClone(obj));
