/**
 * 给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：
 * 0 <= a, b, c, d < n
 * a、b、c 和 d 互不相同
 * nums[a] + nums[b] + nums[c] + nums[d] == target
 * 你可以按 任意顺序 返回答案 。
 */
function fourSum(nums, target) {
    nums.sort((x, y) => x - y);
    let keyMap = new Map();
    const res = []
    if(nums.length < 4) {
        return []
    }
    for(let i = 0; i < nums.length - 3; i++) {
        for(let j = i+1; j < nums.length - 2; j++) {
            let left = j + 1;
            let right = nums.length - 1
            while(left < right) {
                const tempTarget = target - nums[i] - nums[j]
                if(nums[left] + nums[right] < tempTarget) {
                    left++
                } else {
                    const arr = [nums[i], nums[j], nums[left], nums[right]]
                    const key = arr.join('')
                    if(nums[left] + nums[right] === tempTarget && !keyMap.has(key)) {
                        res.push(arr)
                        keyMap.set(key, true)
                    }
                    right--
                }
            }
        }
    }
    return res
}
console.log(fourSum([1,0,-1,0,-2,2], 0))