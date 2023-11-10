/**
给你两个非空的链表，表示两个非负的整数。它们每位数字都是按照逆序的方式存储的，并且每个节点只能存储一位数字。
请你将两个数相加，并以相同形式返回一个表示和的链表。
你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例1：
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.

示例 2：
输入：l1 = [0], l2 = [0]
输出：[0]

示例 3：
输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]

提示：
每个链表中的节点数在范围 [1, 100] 内
0 <= Node.val <= 9
题目数据保证列表表示的数字不含前导零
*/

/**
 * Definition for singly-linked list.

 */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
/**
 * @abstract 用于创建一个链表
 * @param {number[]} numbers 输入的数组
 * @returns 返回一个链表的头部
 */
function createList(numbers: number[]): ListNode | null {
  let head: ListNode | null = null;
  let cur: ListNode | null = null;
  for (let num of numbers) {
    if (!head) {
      head = new ListNode(num);
      cur = head;
    } else {
      cur!.next = new ListNode(num);
      cur = cur!.next;
    }
  }
  return head;
}
/**
 * @abstract 将链表的数据输出到数组中
 * @param {ListNode | null} node
 * @returns {number[]}
 */
function getListVal(node: ListNode | null): number[] {
  let cur = node;
  let res: number[] = [];
  while (cur) {
    res.push(cur.val);
    cur = cur!.next;
  }
  return res;
}
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = function (l1: ListNode | null, l2: ListNode | null) {
  const node = new ListNode(0);
  let cur = node;
  let count = 0;
  while (count !== 0 || l1 !== null || l2 !== null) {
    const x = l1 === null ? 0 : l1.val;
    const y = l2 === null ? 0 : l2.val;
    let sum = x + y + count;
    count = Math.floor(sum / 10); // 去尾取整
    sum = sum % 10;
    cur.next = new ListNode(sum);
    cur = cur.next;
    l1 = l1 ? l1.next : null;
    l2 = l2 ? l2.next : null;
  }
  return node.next;
};

const num1 = [2, 4, 3]; // 测试数据1
const num2 = [5, 6, 4]; // 测试数据2
let l1 = createList(num1); // 创建第一个链表
let l2 = createList(num2); // 创建第二个链表

let result = addTwoNumbers(l1, l2); // 获取相加的数据
console.log(getListVal(result)); // 打印
