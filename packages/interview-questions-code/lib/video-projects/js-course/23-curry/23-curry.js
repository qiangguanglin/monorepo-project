function curry() {
    const fn = arguments[0]
     // arguments是一个类数组，包含length的对象
    //将slice绑定到arguments上可以改变slice方法内部的this指向，内部实现问题
    // 或者也可以Array.from(arguments)转为数组
    // 入参处直接使用...args来获取一个参数数组
    const args = Array.prototype.slice.call(arguments, 1)
    if(args.length === fn.length) { // fn.length是函数的一个属性，表示函数定义时的参数数量
        // 进入此if说明第一次参数就是传够了
        // 直接执行fn函数
        return fn.apply(this, args) // apply返回一个新函数
    }
    // 下面是处理参数不够的情况
    // 参数不够则记录当前参数，并继续返回函数，当参数够了的时候，就执行函数
    function _curry() {
        args.push(...arguments) // 记录参数
        if(args.length === fn.length) {
            return fn.apply(this, args)
        }
        return _curry
    }
    return _curry
}

// 测试 1
function add(a, b, c) {
    return a + b + c;
}

console.log(curry(add)(1)(2)(3)); // 6
console.log(curry(add, 1)(2)(3)); // 6
console.log(curry(add, 1, 2, 3)); // 6
console.log(curry(add, 1)(3, 4)); // 8

var addCurrying = curry(add)(2);
console.log(addCurrying(7)(8)); // 17

// 测试 2
function check(reg, txt) {
    return reg.test(txt)
}
var hasNumber = curry(check)(/\d+/g);
console.log(hasNumber('test1'));// true


