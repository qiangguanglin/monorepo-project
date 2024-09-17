/**
 * JS label语法，标记语法：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/label
 * 标记语句可以和break和continue语句一起使用，标记就是在一条语句前面加个可以引用的标识符
 * 注意：需要注意的是，JavaScript 没有 goto 语句，标记只能和 break 或 continue 一起使用
 */
outer: for (let i = 0; i < 10; i++) {
    console.log("外层循环");
    for (let j = 0; j < 10; j++) {
        console.log("内层循环");
        if (i * j > 30) {
            console.log("退出顶层循环", i, j);
            break outer;
        }
    }
}
