/**
寻找两个正序数组的中位数
给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。
算法的时间复杂度应该为 O(log (m+n)) 。

示例 1：
输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2

示例 2：
输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5

提示：
nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-106 <= nums1[i], nums2[i] <= 106
 */

/**
 * @abstract 暴力法
 * @param {number[]} nums1 数组1
 * @param {number[]} nums2 数组2
 * @returns {number} 返回合并数组的中位数
 */
function findMedianSortedArrays1(nums1: number[], nums2: number[]): number {
  const newArr = [...nums1, ...nums2].sort((a, b) => a - b);
  const length = newArr.length;
  if (length % 2) {
    return newArr[(length - 1) / 2];
  }
  return (newArr[length / 2 - 1] + newArr[length / 2]) / 2;
}
console.log(
  "fn1",
  findMedianSortedArrays2([1, 3, 6, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
);
console.log("fn1", findMedianSortedArrays2([1, 2, 4, 9], [3, 4, 5, 6]));
console.log("fn1", findMedianSortedArrays2([1, 3], [2]));
console.log("fn1", findMedianSortedArrays2([1, 2], [3, 4]));
console.log("fn1", findMedianSortedArrays2([1, 2], [-1, 3]));
console.log(
  "fn1",
  findMedianSortedArrays2([0, 0, 0, 0, 0], [-1, 0, 0, 0, 0, 0, 1])
);

/**
 * @abstract 二分法
 * @param {number[]} nums1 数组1
 * @param {number[]} nums2 数组2
 * @returns {number} 返回合并数组的中位数
 * 不需要合并两个有序数组，只要找到中位数的位置即可。
 * 由于两个数组的长度已知，因此中位数对应的两个数组的下标之和也是已知的。
 * 维护两个指针，初始时分别指向两个数组的下标0的位置，每次将指向较小值的指针后移一位（如果一个指针已经到达数组末尾，则只需要移动另一个数组的指针），直到到达中位数的位置。
 */
/**
 * @abstract 用于获取两个数组中第mid小的数字
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} mid
 * @returns {number} 第几小的数字
 */
function getMiddleNumber(
  nums1: number[],
  nums2: number[],
  mid: number
): number {
  // 处理空数组情况
  if (!nums1.length) {
    return nums2[mid - 1];
  }
  if (!nums2.length) {
    return nums1[mid - 1];
  }
  let th = mid; // 存储传入的第几小的数字
  let i = 0,
    j = 0; // 两个数组的指针，指向二分的下标
  let k = Math.floor(mid / 2); // 将传入的第几小的数字均分，实现二分处理
  let di = 0,
    dj = 0; // 用于指向每个数组前面已经删除了多少项目
  i = j = k - 1; // 指针的初始值
  // 二分法循环
  while (k > 0) {
    th = th - k;
    if (nums1[i] >= nums2[j]) {
      // 第一个数组的数字大小大于等于第二个数组的数字大小；等于的情况是需要与nums1的长度大于nums2的长度配合使用的，避免数组越界
      dj = dj + k; // 删除第二个数组的前dj个数字
      k = Math.floor(th / 2); // 重新赋值均分的k，再次二分
      i = di + k - 1; // 获取新的指针下标
      j = dj + k - 1;
    } else {
      di = di + k;
      k = Math.floor(th / 2);
      j = dj + k - 1;
      i = di + k - 1;
    }
    if (di + dj === mid - 1) {
      // 当删除掉的元素之和正好等于mid-1时，那么第mid小的数组必定在di和dj的下标的较小值
      break;
    }
  }
  if (nums1[di] && nums2[dj]) {
    // 当且仅当均有值是，才去最小值
    return Math.min(nums1[di], nums2[dj]);
  }
  return nums1[di] ?? nums2[dj]; // 如果有一个数组越界了，那就直接取另一个值即可，nums1=[1, 2], nums2=[3, 4]再求第3小的数字时，即会出现这种情况
}
/**
 * @abstract 处理奇数和偶数的情况，获取中位数
 * @param {*} nums1
 * @param {*} nums2
 * @returns {number} 中位数
 */
function findMedianSortedArrays2(nums1: number[], nums2: number[]): number {
  // 保证nums1中存储的是最长的数组，与后续nums[i]>=nums2[j]结合，处理等于的情况，避免数组越界
  if (nums1.length < nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }
  const m = nums1.length,
    n = nums2.length;
  const isOdd = (m + n) % 2;
  if (isOdd) {
    const res = getMiddleNumber(nums1, nums2, (m + n + 1) / 2);
    return res;
  } else {
    const res1 = getMiddleNumber(nums1, nums2, (m + n) / 2);
    const res2 = getMiddleNumber(nums1, nums2, (m + n) / 2 + 1);
    return (res1 + res2) / 2;
  }
}
console.log(
  "fn2",
  findMedianSortedArrays2([1, 3, 6, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
);
console.log("fn2", findMedianSortedArrays2([1, 2, 4, 9], [3, 4, 5, 6]));
console.log("fn2", findMedianSortedArrays2([1, 3], [2]));
console.log("fn2", findMedianSortedArrays2([1, 2], [3, 4]));
console.log("fn2", findMedianSortedArrays2([1, 2], [-1, 3]));
console.log(
  "fn2",
  findMedianSortedArrays2([0, 0, 0, 0, 0], [-1, 0, 0, 0, 0, 0, 1])
);
