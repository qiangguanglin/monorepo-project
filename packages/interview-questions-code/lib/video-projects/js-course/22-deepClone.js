// 简单深拷贝
function deepCloneFn1(target) {
    let result
    if(typeof target === 'object') {
        if(Array.isArray(target)) { // 如果是数组，递归调用
            result = []
            for(let i in target) {
                result.push(deepCloneFn1(target[i]))
            }
        } else if(target === null) { // null
            result = null
        } else if(target.constructor === RegExp) { // 正则
            result = new RegExp(target)
        } else if(target.constructor === Date) { // 日期
            result = new Date(target)
        } else { // 普通对象
            result = {}
            Object.keys(target).forEach(key => { // 使用Object.keys是因为直接for in可能会遍历到原型链上的属性
                result[key] = deepCloneFn2(target[key])
            })
        }
    } else { // 基本类型
        result = target
    }
    return result
}

function deepCloneFn2(target) {
    let result
    if(target instanceof Object) { // 原型是对象
        if(target instanceof Function) { // 原型是函数
            result = target
        } else if(target instanceof RegExp) { // 原型是正则或者日期
            result = new RegExp(target)
        } else if(target instanceof Date) {
            result = new Date(target)
        } else { // 普通对象
            result = {}
            Object.keys(target).forEach(key => {
                result[key] = deepCloneFn2(target[key])
            })
        }
    } else if(target instanceof Array) { // 原型是数组
        result = []
        for(let key in target) {
            result.push(deepCloneFn2(target[key]))
        }
    } else { // 其他基本类型
        result = target
    }
    return result
}

// 全的深拷贝
function deepCloneFn3(target, hash = new WeakMap()) {
    if(target === null || typeof target !== 'object') {
        return target // 处理基本类型和null
    }
    if(hash.has(target)) {
        return hash.get(target) // 处理循环引用问题
    }
    
    let result
    if(target instanceof Date) { // 处理日期
        result = new Date(target)
    } else if(target instanceof RegExp) { // 处理正则
        result = new RegExp(target)
    } else if(target instanceof Array) { // 处理数组
        result = [] // 新建了一个数组，所以是深拷贝
        for(let item of target) {
            result.push(deepCloneFn3(item, hash))
        }
    } else if(target instanceof Map) { // 处理map
        result = new Map()
        target.forEach((value, key) => {
            // 因为map的key可能是复杂类型，针对key也要递归
            // 同样，值的话肯定要递归
            result.set(deepCloneFn3(key, hash), deepCloneFn3(value, hash))
        })
    } else if(target instanceof Set) {
        result = new Set()
        target.forEach(v => {
            result.add(deepCloneFn3(v, hash))
        })
    } else if (target instanceof WeakMap) {
        result = new WeakMap(); // 处理 WeakMap
        // WeakMap 的键是弱引用，不能直接克隆
        // 这里可以选择不克隆或根据需求处理
    } else if (target instanceof WeakSet) {
        result = new WeakSet(); // 处理 WeakSet
        // WeakSet 的键是弱引用，不能直接克隆
        // 这里可以选择不克隆或根据需求处理
    } else {
        result = {} // 处理普通对象，
        hash.set(target, result) // 记录已经克隆的对象
        for(let key of Object.keys(target)) { // 使用Object.keys是为了枚举私有的属性，而不是原型上的属性
            result[key] = deepCloneFn3(target[key], hash)
        }
    }
    return result
}

let obj1 = {
    name: 'qiang',
    date: [1,2,3, {
        a: 1,
        b:2
    }],
    address: {
        country: 'zhong',
        province: 'shang'
    },
    sayHello() {
        console.log('hello')
    },
    date: new Date('2023-01-01')
}

let obj2 = deepCloneFn1(obj1)
let obj3 = deepCloneFn2(obj1)
let obj4 = deepCloneFn3(obj1)
obj1.address = {
    country: 'jiang',
    province: 'su'
}
obj1.date.setFullYear('2024')
console.log(obj1)
console.log(obj2)
console.log('--------');
console.log(obj3)
console.log('--------');
console.log(obj4)


