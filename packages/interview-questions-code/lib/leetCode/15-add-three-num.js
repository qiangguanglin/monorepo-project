/**
 * 给你一个整数数组 nums ，
 * 判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请你返回所有和为 0 且不重复的三元组。
 * 注意：答案中不可以包含重复的三元组。
 */
function addThreeNumbers(nums) {
    if(nums.length < 3) {
        return []
    }
    nums.sort((x, y) => x-y)
    const res = []
    const len = nums.length
    const keys = new Map()
    for(let i = 0; i < len - 2; i++) {
        let left = i + 1
        let right = len - 1
        const target = -nums[i]
        while(left < right) {
            if(nums[left] < target - nums[right]) {
                left++
            } else {
                const arr = [nums[i], nums[left], nums[right]]
                const key = arr.join('')
                if(nums[left] === target - nums[right] && !keys.has(key)) {
                    res.push(arr)
                    keys.set(key, true)
                }
                right--
            }
        }
    }
    return res
}

console.log(addThreeNumbers([-1,0,1,2,-1,-4]))