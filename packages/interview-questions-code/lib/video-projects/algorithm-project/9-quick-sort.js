const arr = [4, 1, 6, 9, 3, 2, 8, 7];

// 简单的快速排序
function quickSort1(arr) { 
    if (arr === null || arr.length === 0) return []
    // 选班长
    const leader = arr[0]
    // 小的站左边，大的站右边
    let left = []
    let right = []
    for (let i = 1; i < arr.length; i++) { 
        if (arr[i] < leader) {
            left.push(arr[i]);
        } else { 
            right.push(arr[i])
        }
    }
    left = quickSort1(left)
    right = quickSort1(right)
    left.push(leader) // 排完需要将第一个放在中间
    return left.concat(right)
}
console.log('fn1', quickSort1(arr));

// 复杂的快速排序
function quickSort2(arr) { 

}