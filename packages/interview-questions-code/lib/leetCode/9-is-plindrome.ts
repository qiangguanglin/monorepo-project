function isPalindrome(x: number): boolean{
    const xStr = x.toString()
    if (xStr[0] === '-') { // 负数肯定不是回文数
        return false
    }
    if (xStr.length === 1) { 
        return true
    }
    let left = 0
    let right = xStr.length - 1
    while (left <= right) { 
        if (xStr[left] === xStr[right]) {
            left++;
            right--;
        } else { 
            return false
        }
    }
    return true
}
console.log(isPalindrome(121))
console.log(isPalindrome(-121));
console.log(isPalindrome(10))
