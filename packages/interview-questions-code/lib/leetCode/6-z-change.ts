// 获取完整的而且数组
function getArr(s: string, numRows: number) { 
    const len = s.length
    const p = Math.ceil(len / (2 * numRows - 2)); // 共几个周期，向上取整，保证周期完整，多余的直接空即可
    const arr = Array.from(new Array(numRows), () => new Array(2 * p).fill(null))
    return arr
}
function zChange(s: string, numRows: number): string { 
    if (numRows === 1) return s
    const arr = getArr(s, numRows)
    let th = 1; // 第几个周期
    let dt = 0 // 已处理了多少个周期的元素
    const p = 2 * numRows - 2 // 一个周期包含的元素
    for (let i = 0; i < s.length; i++) {
        if (i + 1 > th * p) { // 当进入下一个周期的时候，th自增，同时已经处理的元素也要更新
            th++;
            dt += p;
        }
        if (!Math.floor((i - dt) / numRows)) { // 每一个i都减去已经处理的元素，这样可以保证每次都在当前周期内执行，如果是0，那么就是说在第一列，如果不是0则在第二列
            const row = (i - dt) % numRows // 获取当前元素对应二维数组的第几行
            const col = 2 * th - 2 // 第几个周期的第一列
            arr[row][col] = s[i] || null
        } else {
            const row = (numRows - 1) - ((i - dt) % numRows + 1) // 第二列要倒过来填充，加1表示第一行是空的，从第二行开始填充
            const col = 2 * th - 1 // 第几个周期的第二列
            arr[row][col] = s[i] || null
        }
    }
    const res = arr.flat().filter(item => item !== null).join('') // 读取数组
    return res
}
console.log(zChange('PAYPALISHIRING', 3))
console.log(zChange('PAYPALISHIRING', 4))
console.log(zChange('A', 1))
