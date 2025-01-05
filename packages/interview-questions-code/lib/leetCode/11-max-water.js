/**
 * 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 * 返回容器可以储存的最大水量。**/
//双指针法
function maxWater(height) {
    let i=0
    let j=height.length-1
    let maxWater = 0
    while(i<j) {
       const tempV = (j-i)*Math.min(height[i], height[j])
       maxWater = Math.max(maxWater, tempV)
       if(height[i]<height[j]) {
        i++
       } else {
        j--
       }
    }
    return maxWater
}
console.log(maxWater([1,8,6,2,5,4,8,3,7]))