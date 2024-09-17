/** 等号运算符的转换规则
 * 1.NaN和其他任何类型比较都是返回false（包括和他自己）；NaN == NaN // false
 * 2.布尔值和其他任何类型比较都会先转换为Number类型；
 *  true == 1  // true
 *  true == '2'  // false
 *  true == ['1']  // true, 先把 true 变成 1， ['1']拆箱成 '1', 再参考规则3
 * 3.String和Number类型比较会先将String转换为Number；
 *  123 == '123' // true, '123' 会先变成 123
 *  '' == 0 // true, '' 会首先变成 0
 * 4.null和undefined比较是false；除此之外，null、undefined和其他任何结果的比较值都为false；
 * 5.原始类型和引用类型做比较时，引用类型会依照ToPrimitive规则转换为原始类型；
 *  ToPrimitive规则，是引用类型向原始类型转变的规则，它遵循先valueOf后toString的模式期望得到一个原始类型
 * */
/**
 * ToPrimitive规则
 * 1.没有转换为布尔值。所有的对象在布尔上下文（context）中均为 true，就这么简单。只有字符串和数字转换。
 * 2.数字转换发生在对象相减或应用数学函数时。例如，Date 对象（将在 日期和时间 一章中介绍）可以相减，date1 - date2 的结果是两个日期之间的差值。
 * 3.至于字符串转换 —— 通常发生在我们像 alert(obj) 这样输出一个对象和类似的上下文中。
 *
 * 我们可以使用特殊的对象方法，自己实现字符串和数字的转换。
 * 1.hint
 *  类型转换在各种情况下有三种变体。它们被称为 “hint”：
 *      "string": 对象到字符串的转换，当我们对期望一个字符串的对象执行操作时，如 “alert”，那么hint为string类型
 *      "number": 对象到数字的转换，例如当我们进行数学运算时；
 *          // 显式转换
 *          let num = Number(obj);
 *          // 数学运算（除了二元加法）
 *          let n = +obj; // 一元加法
 *          let delta = date1 - date2;
 *          // 小于/大于的比较
 *          let greater = user1 > user2;
 *      "default": 在少数情况下发生，当运算符“不确定”期望值的类型时；
 *          // 二元加法使用默认 hint
 *          let total = obj1 + obj2;
 *         // obj == number 使用默认 hint
 *         if (user == 1) { ... };
 * 1.Symbol.toPrimitive
 *  obj[Symbol.toPrimitive] = function(hint) {
 *      // 这里是将此对象转换为原始值的代码
 *      // 它必须返回一个原始值
 *      // hint = "string"、"number" 或 "default" 中的一个
 *  }
 * 2.如果没有 Symbol.toPrimitive，那么 JavaScript 将尝试寻找 toString 和 valueOf 方法
 *  对于 "string" hint：调用 toString 方法，如果它不存在，则调用 valueOf 方法（因此，对于字符串转换，优先调用 toString）。
 *  对于其他 hint：调用 valueOf 方法，如果它不存在，则调用 toString 方法（因此，对于数学运算，优先调用 valueOf 方法）。
 */

/**
 * 使得a==1 && b==2 && c==3成立
 */
const a = {
    count: 1,
    valueOf() {
        return this.count++;
    },
    // toString() {
    //     return this.count++;
    // },
    // [Symbol.toPrimitive](hint) {
    //     return hint === "default" ? this.count++ : "";
    // },
};
// @ts-ignore
if (a == 1 && a == 2 && a == 3) {
    console.log("你牛皮");
}
// @ts-ignore
// console.log("等式成立", a == 1 && a == 2 && a == 3);
