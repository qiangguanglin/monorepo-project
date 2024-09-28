const arr = [4, 1, 6, 9, 3, 2, 8, 7];

// 冒泡排序
function exchange(arr, i, j) { 
    if (arr && arr.length === 0) return
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

function sort(arr) { 
    for (let i = 0; i < arr.length; i++) { 
        for (let j = 0; j < arr.length - i - 1; j++) { 
            if (arr[j] > arr[j+1]) { 
                exchange(arr, j+1, j)
            }
        }
    }
    return arr
}

console.log(sort(arr))