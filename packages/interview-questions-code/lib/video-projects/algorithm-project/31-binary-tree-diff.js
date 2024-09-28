/** 二叉树构造
 *    a
 *  b   c
 * d e f g
 *
 */

function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

const a1 = new Node("a");
const b1 = new Node("b");
const c1 = new Node("c");
const d1 = new Node("d");
const e1 = new Node("e");
const f1 = new Node("f");
const g1 = new Node("g");

a1.left = b1;
a1.right = c1;
b1.left = d1;
b1.right = e1;
c1.left = f1;
c1.right = g1;

const a2 = new Node("a");
const b2 = new Node("b");
const c2 = new Node("z");
const d2 = new Node("d");
const e2 = new Node("e");
const f2 = new Node("x");
const g2 = new Node("g");

a2.left = b2;
a2.right = c2;
b2.left = d2;
b2.right = e2;
c2.left = f2;
// c2.right = g2;
f2.left = g2;

/**
 * 二叉树的diff算法
 * 新增了什么、修改了什么、删除了什么
 * { type: '新增', origin: null, now: c2 }
 * { type: '修改', origin: c1, now: c2 }
 * { type: '删除', origin: c1, now: null }
 */
function diffTree(root1, root2, diffList) { 
    if (root1 === root2) { // 节点相同
        return diffList;
    } else if (root1 === null && root2 !== null) { // 新增
        diffList.push({ type: '新增', origin: null, now: root2 });
    } else if (root1 !== null && root2 === null) { // 删除
        diffList.push({ type: '删除', origin: root1, now: null });
    } else if (root1.value !== root2.value) {  // 修改
        diffList.push({ type: '修改', origin: root1, now: root2 })
        diffTree(root1.left, root2.left, diffList); // 修改之后也要递归调用，不然子节点就不比较了
        diffTree(root1.right, root2.right, diffList);
    } else {
        diffTree(root1.left, root2.left, diffList) // 节点值相同的时候继续递归调用下一步判断
        diffTree(root1.right, root2.right, diffList)
    }
    return diffList
}
const diffList = []
console.log(diffTree(a1, a2, diffList))
