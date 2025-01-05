/**
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 * 如果不存在公共前缀，返回空字符串 ""。
 */

function findMaxPrefix(strs) {
    if(!strs.length) {
        return ""
    }
    let ans = strs[0]
    let re = ""
    for(let i = 0; i < ans.length; i++) {
        for(let j = 1; j < strs.length; j++) {
            if(strs[j][i] !== ans[i]) {
                return ans.slice(0, i) // 此时的i应该是不相等的，所以截取的是i位置
            }
        }
        re = ans.slice(0, i + 1) // 此时的i其实还没有自增，所以需要截取加1
    }
    return re
}

console.log(findMaxPrefix(["flower","flow","flight"]))
console.log(findMaxPrefix(["dog","racecar","car"]))
console.log(findMaxPrefix(["dog","","car"]))
console.log(findMaxPrefix(["flower","flower","flower","flower"]))