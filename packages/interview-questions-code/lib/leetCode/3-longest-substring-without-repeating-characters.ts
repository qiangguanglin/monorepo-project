/**
给定一个字符串s，请你找出其中不含有重复字符的最长子串的长度。

示例 1:
输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

示例 2:
输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

示例 3:
输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

提示：
0 <= s.length <= 5 * 104
s 由英文字母、数字、符号和空格组成
*/

/**
 * @abstract 暴力法
 * @param {string} s 字符串
 * @returns {string} 最长无重复子串大小
 */
function lengthOfLongestSubstringFn1(s: string): number {
  if (!s?.length) {
    return 0;
  }
  let count = 1;
  let charMap = new Set();
  for (let i = 0; i < s.length; i++) {
    charMap.add(s[i]);
    for (let j = i + 1; j < s.length; j++) {
      if (!charMap.has(s[j])) {
        charMap.add(s[j]);
        count = Math.max(count, j - i + 1);
      } else {
        break;
      }
    }
    charMap.clear();
  }
  return count;
}
console.log(lengthOfLongestSubstringFn1("abcabcbb"));
console.log(lengthOfLongestSubstringFn1("bbbbb"));
console.log(lengthOfLongestSubstringFn1("pwwkew"));

/**
 * @abstract 滑动窗口法
 * @param {string} s 字符串
 * @returns {string} 最长无重复子串大小
 */
function lengthOfLongestSubstringFn2(s: string): number {
  let set = new Set();
  let i = 0,
    j = 0;
  let maxLength = 0;
  while (i < s.length && j < s.length) {
    if (!set.has(s[j])) {
      set.add(s[j++]);
      maxLength = Math.max(maxLength, j - i);
    } else {
      set.delete(s[i++]);
    }
  }
  return maxLength;
}
console.log(lengthOfLongestSubstringFn1("abcabcbb"));
console.log(lengthOfLongestSubstringFn1("bbbbb"));
console.log(lengthOfLongestSubstringFn1("pwwkew"));
