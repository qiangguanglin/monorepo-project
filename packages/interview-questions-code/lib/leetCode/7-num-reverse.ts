function numReverse(x: number) { 
    let res = parseInt(x.toString().split('').reverse().join(''))
    res = x>0 ? res : -res
    return res > Math.pow(2, 31) || res < Math.pow(2, -31) ? 0 : res
}

console.log(numReverse(123))
console.log(numReverse(-123))
console.log(numReverse(120))
console.log(numReverse(0))


