
// 面试题
// add(1)(2)(3) = 6;
// add(1, 2, 3)(4) = 10;
// add(1)(2)(3)(4)(5) = 15;
function add() {
    // 第一次调用拿到所有的参数
    const args = Array.prototype.slice.call(arguments);

    // 该函数会被返回，该函数的作用是手机参数
    function _adder() {
        args.push(...arguments);
        return _adder
    }

    // 当调用toString方法的时候，说明不要接收参数了
    _adder.toString = function() {
        return args.reduce((a, b) => a+b, 0)
    }

    // 这个 return 是第一次调用的时候返回上面的函数体，
    // 这样后面所有的括号再执行的时候就是执行 _adder 函数体
    return _adder
}

console.log(add(1)(2)(3).toString())
console.log(add(1, 2, 3)(4).toString())
console.log(add(1)(2)(3)(4)(5).toString())