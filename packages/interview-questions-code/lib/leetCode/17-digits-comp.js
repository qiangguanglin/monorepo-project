/**
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 */
// 循环遍历
function comTwoArr(arr1, arr2) {
    let res = []
    if(!arr1.length) {
        res = [...arr2]
    } else {
        for(let i = 0; i < arr1.length; i++) {
            for(let j = 0; j < arr2.length; j++) {
                res.push(`${arr1[i]}${arr2[j]}`)
            }
        }
    }
    return res
}

function digitsComp(digits) {
    if(!digits.length) {
        return []
    }
    let res = []
    const digitsMap = new Map([
        ['2', ['a', 'b', 'c']],
        ['3', ['d', 'e', 'f']],
        ['4', ['g', 'h', 'i']],
        ['5', ['j', 'k', 'l']],
        ['6', ['m', 'n', 'o']],
        ['7', ['p', 'q', 'r', 's']],
        ['8', ['t', 'u', 'v']],
        ['9', ['w', 'x', 'y', 'z']],
    ])
    for(let i = 0; i < digits.length; i++) {
        res = comTwoArr([...res], digitsMap.get(digits[i]))
    }
    return res
}
// console.log(digitsComp("23"))
// console.log(digitsComp("2"))
// console.log(digitsComp(""))

// 递归法

const digitsMap = new Map([
    ['2', ['a', 'b', 'c']],
    ['3', ['d', 'e', 'f']],
    ['4', ['g', 'h', 'i']],
    ['5', ['j', 'k', 'l']],
    ['6', ['m', 'n', 'o']],
    ['7', ['p', 'q', 'r', 's']],
    ['8', ['t', 'u', 'v']],
    ['9', ['w', 'x', 'y', 'z']],
])
function comArr(res, digits) {
    if(!digits || !digits.length) {
        return res
    }
    let tempArr = []
    const firstArr = digitsMap.get(digits.charAt(0)) || []
    if(!res.length) {
        tempArr = [...firstArr]
    } else {
        for(let i = 0; i < res.length; i++) {
            for(let j = 0; j < firstArr.length; j++) {
                tempArr.push(`${res[i]}${firstArr[j]}`)
            }
        }
    }
    return comArr(tempArr, digits.slice(1))
}
// 递归
function digitsComp2(digits) {
    if(!digits.length) {
        return []
    }
    const res = comArr([], digits)
    return res
}
console.log(digitsComp2("23"))
console.log(digitsComp2("2"))
console.log(digitsComp2(""))

