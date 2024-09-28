const arr = [4, 1, 6, 9, 3, 2, 8, 7];

function selectSort(arr) { 
    // 每一次将最小的放在了最前面
    for (let i = 0; i < arr.length; i++) { 
        for (let j = i + 1; j < arr.length; j++) { 
            if (arr[i] > arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
    }
    return arr
}

console.log(selectSort(arr))