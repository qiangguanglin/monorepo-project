/**
 * 给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。
 * 返回这三个数的和。
 * 假定每组输入只存在恰好一个解。
 */

function nearThreeNumbers(nums, target) {
    if(nums.length < 3) {
        return []
    }
    nums.sort((x, y) => x-y)
    let res = Math.pow(2, 53) - 1
    const len = nums.length
    for(let i = 0; i < len - 2; i++) {
        let left = i + 1
        let right = len - 1
        while(left < right) {
            if(nums[left] + nums[right] + nums[i] === target) {
                res = nums[left] + nums[right] + nums[i]
                return res
            }
            if(Math.abs(target - nums[i] - nums[left] - nums[right]) < Math.abs(target - res)) {
                res = nums[left] + nums[right] + nums[i]
            }
            if(nums[left] + nums[i] + nums[right] < target) {
                left++
            } else {
                right--
            }
        }
    }
    return res
}

console.log(nearThreeNumbers([-1,2,1,-4], 1))
console.log(nearThreeNumbers([0,0,0], 1))
console.log(nearThreeNumbers([0,1,2], 0))
console.log(nearThreeNumbers([1,1,1,0], -100))
console.log(nearThreeNumbers([1,1,1,0], 100))

